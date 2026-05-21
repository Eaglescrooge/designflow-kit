import { useState } from "react";
import { X, BookmarkCheck, Loader2, Mail } from "lucide-react";

interface SaveSessionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (email: string) => Promise<void>;
  toolLabel: string;
}

export function SaveSessionModal({ open, onClose, onSave, toolLabel }: SaveSessionModalProps) {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(email.trim());
      setSaved(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border rounded-2xl shadow-xl w-full max-w-sm p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          data-testid="button-close-save-modal"
        >
          <X className="w-4 h-4" />
        </button>

        {saved ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <BookmarkCheck className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-base mb-1">Session saved!</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a resume link to <span className="font-medium text-foreground">{email}</span>. Use it anytime to pick up right where you left off.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              data-testid="button-save-modal-done"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">Save your session</h3>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">Continue your {toolLabel} work another time</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Your email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/50"
                    data-testid="input-save-session-email"
                  />
                </div>
                {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={saving || !email.trim()}
                className="w-full py-2.5 rounded-xl bg-foreground text-background text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                data-testid="button-save-session-submit"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? "Saving…" : "Send me the resume link"}
              </button>
            </form>

            <p className="text-[11px] text-muted-foreground/50 text-center mt-3">
              We'll email you a private link. No account required.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

interface SaveSessionBannerProps {
  onOpen: () => void;
  onDismiss: () => void;
}

export function SaveSessionBanner({ onOpen, onDismiss }: SaveSessionBannerProps) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 bg-background border border-border rounded-2xl shadow-lg px-4 py-3 text-sm">
        <BookmarkCheck className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground">Want to save this conversation?</span>
        <button
          onClick={onOpen}
          className="text-foreground font-medium hover:underline"
          data-testid="button-save-session-banner"
        >
          Save session
        </button>
        <button
          onClick={onDismiss}
          className="p-0.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          data-testid="button-dismiss-save-banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
