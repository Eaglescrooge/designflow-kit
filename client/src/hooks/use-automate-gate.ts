import { useState, useEffect, useCallback } from "react";

const PROMPT_LIMIT = 3;
const LOCKOUT_DURATION_MS = 10 * 60 * 60 * 1000;

const KEYS = {
  promptCount: "dfk_automate_prompt_count",
  unlocked: "dfk_automate_unlocked",
  lockedUntil: "dfk_automate_locked_until",
  userEmail: "dfk_automate_user_email",
  userRole: "dfk_automate_user_role",
};

function getStoredNumber(key: string): number {
  return parseInt(localStorage.getItem(key) || "0", 10);
}

export function useAutomateGate() {
  const [promptCount, setPromptCount] = useState(() => getStoredNumber(KEYS.promptCount));
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(KEYS.unlocked) === "true");
  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    const v = localStorage.getItem(KEYS.lockedUntil);
    return v ? parseInt(v, 10) : null;
  });
  const [showGate, setShowGate] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  useEffect(() => {
    if (lockedUntil !== null && Date.now() >= lockedUntil) {
      localStorage.removeItem(KEYS.lockedUntil);
      localStorage.removeItem(KEYS.unlocked);
      localStorage.setItem(KEYS.promptCount, "0");
      setLockedUntil(null);
      setUnlocked(false);
      setPromptCount(0);
    }
  }, [lockedUntil]);

  const checkGate = useCallback((onAllowed: () => void) => {
    if (unlocked) {
      const current = getStoredNumber(KEYS.promptCount) + 1;
      localStorage.setItem(KEYS.promptCount, String(current));
      setPromptCount(current);
      onAllowed();
      return;
    }
    if (isLocked) {
      return;
    }
    const current = getStoredNumber(KEYS.promptCount) + 1;
    localStorage.setItem(KEYS.promptCount, String(current));
    setPromptCount(current);
    if (current > PROMPT_LIMIT) {
      setPendingAction(() => onAllowed);
      setShowGate(true);
      return;
    }
    onAllowed();
  }, [unlocked, isLocked]);

  const handleUnlocked = useCallback((email: string, role: string) => {
    localStorage.setItem(KEYS.unlocked, "true");
    localStorage.setItem(KEYS.userEmail, email);
    localStorage.setItem(KEYS.userRole, role);
    localStorage.removeItem(KEYS.lockedUntil);
    setUnlocked(true);
    setLockedUntil(null);
    setShowGate(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const handleDismissed = useCallback(() => {
    const until = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem(KEYS.lockedUntil, String(until));
    setLockedUntil(until);
    setShowGate(false);
    setPendingAction(null);
  }, []);

  const openGate = useCallback(() => {
    setShowGate(true);
  }, []);

  return {
    showGate,
    isLocked,
    lockedUntil,
    checkGate,
    handleUnlocked,
    handleDismissed,
    openGate,
  };
}
