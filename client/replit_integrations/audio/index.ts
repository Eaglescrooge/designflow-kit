/**
 * Voice chat client utilities for Replit AI Integrations.
 * 
 * Usage:
 * 1. Copy audio-playback-worklet.js to your public/ folder
 * 2. Import and use the React hooks in your components
 * 
 * Example:
 * ```tsx
 * import { useVoiceRecorder, useVoiceStream } from "./audio";
 * 
 * function VoiceChat() {
 *   const [transcript, setTranscript] = useState("");
 *   const recorder = useVoiceRecorder();
 *   const stream = useVoiceStream({
 *     onTranscript: (_, full) => setTranscript(full),
 *     onComplete: (text) => console.log("Done:", text),
 *   });
 * 
 *   const handleClick = async () => {
 *     if (recorder.state === "recording") {
 *       const blob = await recorder.stopRecording();
 *       await stream.streamVoiceResponse("/api/voice-conversations/1/messages", blob);
 *     } else {
 *       await recorder.startRecording();
 *     }
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={handleClick}>
 *         {recorder.state === "recording" ? "Stop" : "Record"}
 *       </button>
 *       <p>{transcript}</p>
 *     </div>
 *   );
 * }
 * ```
 */

export { decodePCM16ToFloat32, createAudioPlaybackContext } from "./audio-utils";
export { useVoiceRecorder, type RecordingState } from "./useVoiceRecorder";
export { useAudioPlayback, type PlaybackState } from "./useAudioPlayback";
export { useVoiceStream } from "./useVoiceStream";

