import pLimit from "p-limit";
import pRetry from "p-retry";

/**
 * Batch Processing Utilities
 *
 * This module provides a generic batch processing function with built-in
 * rate limiting and automatic retries. Use it for any task that requires
 * processing multiple items through an LLM or external API.
 *
 * USAGE:
 * ```typescript
 * import { batchProcess, isRateLimitError } from "./replit_integrations/batch";
 *
 * const results = await batchProcess(
 *   artworks,
 *   async (artwork) => {
 *     // Your custom LLM logic here
 *     const response = await openai.chat.completions.create({
 *       model: "gpt-5.1",
 *       messages: [{ role: "user", content: `Categorize: ${artwork.name}` }],
 *       response_format: { type: "json_object" },
 *     });
 *     return JSON.parse(response.choices[0]?.message?.content || "{}");
 *   },
 *   { concurrency: 2, retries: 5 }
 * );
 * ```
 */

export interface BatchOptions {
  /** Max concurrent requests (default: 2) */
  concurrency?: number;
  /** Max retry attempts for rate limit errors (default: 7) */
  retries?: number;
  /** Initial retry delay in ms (default: 2000) */
  minTimeout?: number;
  /** Max retry delay in ms (default: 128000) */
  maxTimeout?: number;
  /** Callback for progress updates */
  onProgress?: (completed: number, total: number, item: unknown) => void;
}

/**
 * Check if an error is a rate limit or quota violation.
 * Use this in custom error handling if needed.
 */
export function isRateLimitError(error: unknown): boolean {
  const errorMsg = error instanceof Error ? error.message : String(error);
  return (
    errorMsg.includes("429") ||
    errorMsg.includes("RATELIMIT_EXCEEDED") ||
    errorMsg.toLowerCase().includes("quota") ||
    errorMsg.toLowerCase().includes("rate limit")
  );
}

/**
 * Process items in batches with rate limiting and automatic retries.
 *
 * @param items - Array of items to process
 * @param processor - Async function to process each item (write your LLM logic here)
 * @param options - Concurrency and retry settings
 * @returns Promise resolving to array of results in the same order as input
 *
 * @example
 * // Process CSV artwork data with custom categorization
 * const categorized = await batchProcess(
 *   csvRows,
 *   async (row) => {
 *     const response = await openai.chat.completions.create({
 *       model: "gpt-5.1", // the newest OpenAI model
 *       messages: [{ role: "user", content: `Categorize artwork: ${row.name}` }],
 *       response_format: { type: "json_object" },
 *     });
 *     return { ...row, category: JSON.parse(response.choices[0]?.message?.content || "{}") };
 *   }
 * );
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  options: BatchOptions = {}
): Promise<R[]> {
  const {
    concurrency = 2,
    retries = 7,
    minTimeout = 2000,
    maxTimeout = 128000,
    onProgress,
  } = options;

  const limit = pLimit(concurrency);
  let completed = 0;

  const promises = items.map((item, index) =>
    limit(() =>
      pRetry(
        async () => {
          try {
            const result = await processor(item, index);
            completed++;
            onProgress?.(completed, items.length, item);
            return result;
          } catch (error: unknown) {
            if (isRateLimitError(error)) {
              throw error; // Rethrow to trigger p-retry
            }
            // For non-rate-limit errors, abort immediately
            const err = error instanceof Error ? error : new Error(String(error));
            (err as any).shouldAbort = true;
            throw err;
          }
        },
        { retries, minTimeout, maxTimeout, factor: 2 }
      )
    )
  );

  return Promise.all(promises);
}

/**
 * Process items sequentially with SSE progress streaming.
 * Use this when you need real-time progress updates to the client.
 *
 * @param items - Array of items to process
 * @param processor - Async function to process each item
 * @param sendEvent - Function to send SSE events to the client
 * @param options - Retry settings (concurrency is always 1 for sequential)
 */
export async function batchProcessWithSSE<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  sendEvent: (event: { type: string; [key: string]: unknown }) => void,
  options: Omit<BatchOptions, "concurrency" | "onProgress"> = {}
): Promise<R[]> {
  const { retries = 5, minTimeout = 1000, maxTimeout = 15000 } = options;

  sendEvent({ type: "started", total: items.length });

  const results: R[] = [];
  let errors = 0;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    sendEvent({ type: "processing", index, item });

    try {
      const result = await pRetry(
        () => processor(item, index),
        {
          retries,
          minTimeout,
          maxTimeout,
          factor: 2,
          onFailedAttempt: (error) => {
            if (!isRateLimitError(error)) {
              const err = error instanceof Error ? error : new Error(String(error));
              (err as any).shouldAbort = true;
              throw err;
            }
          },
        }
      );
      results.push(result);
      sendEvent({ type: "progress", index, result });
    } catch (error) {
      errors++;
      results.push(undefined as R); // Placeholder for failed items
      sendEvent({
        type: "progress",
        index,
        error: error instanceof Error ? error.message : "Processing failed",
      });
    }
  }

  sendEvent({ type: "complete", processed: items.length, errors });
  return results;
}

