import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Mail,
  ShieldCheck,
  ChevronRight,
  X,
  Clock,
  Sparkles,
  Briefcase,
  Code2,
  Palette,
  BarChart2,
  User,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Link } from "wouter";

type Step = "email" | "otp" | "role";

const ROLES = [
  { id: "ux-designer", label: "UX Designer", icon: Palette, color: "text-pink-500 bg-pink-500/10" },
  { id: "product-manager", label: "Product Manager", icon: Briefcase, color: "text-blue-500 bg-blue-500/10" },
  { id: "developer", label: "Developer", icon: Code2, color: "text-green-500 bg-green-500/10" },
  { id: "researcher", label: "Researcher", icon: BarChart2, color: "text-purple-500 bg-purple-500/10" },
  { id: "other", label: "Other", icon: User, color: "text-gray-500 bg-gray-500/10" },
];

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

interface AutomateGateModalProps {
  open: boolean;
  onUnlocked: (email: string, role: string) => void;
  onDismissed: () => void;
}

export function AutomateGateModal({ open, onUnlocked, onDismissed }: AutomateGateModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);

  const resetState = () => {
    setStep("email");
    setEmail("");
    setEmailError("");
    setOtp("");
    setOtpError("");
    setSelectedRole("");
    setOtpSent(false);
    setGeneratedOtp("");
  };

  useEffect(() => {
    if (!open) resetState();
  }, [open]);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setSending(true);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setTimeout(() => {
      setSending(false);
      setOtpSent(true);
      setStep("otp");
    }, 900);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit code");
      return;
    }
    if (otp !== generatedOtp) {
      setOtpError("Incorrect code. Please try again.");
      return;
    }
    setOtpError("");
    setStep("role");
  };

  const handleComplete = () => {
    if (!selectedRole) return;
    onUnlocked(email, selectedRole);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onDismissed();
      }}
    >
      <DialogContent
        className="sm:max-w-md gap-0 p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        data-testid="dialog-automate-gate"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

        <button
          className="absolute top-4 right-4 z-10 rounded-full w-7 h-7 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          onClick={onDismissed}
          data-testid="button-gate-close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex gap-1.5 ml-auto mr-8">
              {(["email", "otp", "role"] as Step[]).map((s, i) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === s
                      ? "w-6 bg-primary"
                      : i < ["email", "otp", "role"].indexOf(step)
                      ? "w-4 bg-primary/40"
                      : "w-4 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {step === "email" && (
            <>
              <DialogHeader className="mb-5">
                <DialogTitle className="text-xl font-bold">Unlock Full Access</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  You've used your 3 free prompts. Enter your email to keep using Automate UX — it's free.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="pl-9 rounded-full"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      data-testid="input-gate-email"
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-destructive mt-1.5 ml-1">{emailError}</p>
                  )}
                </div>
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-blue-500 border-0"
                  onClick={handleSendOtp}
                  disabled={sending}
                  data-testid="button-gate-send-otp"
                >
                  {sending ? "Sending..." : "Send verification code"}
                  {!sending && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <DialogHeader className="mb-5">
                <DialogTitle className="text-xl font-bold">Check your email</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  We sent a 6-digit code to <strong className="text-foreground">{email}</strong>
                </DialogDescription>
              </DialogHeader>
              <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs text-muted-foreground">Your OTP code (demo):</span>
                <span className="ml-auto font-mono font-bold text-primary tracking-widest text-sm" data-testid="text-gate-otp-demo">
                  {generatedOtp}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    className="rounded-full text-center tracking-[0.4em] font-mono text-lg"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (otpError) setOtpError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    data-testid="input-gate-otp"
                  />
                  {otpError && (
                    <p className="text-xs text-destructive mt-1.5 ml-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {otpError}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-blue-500 border-0"
                  onClick={handleVerifyOtp}
                  data-testid="button-gate-verify-otp"
                >
                  Verify code
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <button
                  className="text-xs text-muted-foreground hover:text-primary w-full text-center transition-colors"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setOtpError("");
                  }}
                >
                  Use a different email
                </button>
              </div>
            </>
          )}

          {step === "role" && (
            <>
              <DialogHeader className="mb-5">
                <DialogTitle className="text-xl font-bold">What's your role?</DialogTitle>
                <DialogDescription className="text-sm">
                  Help us personalise your experience.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-border/80 hover:bg-muted/50 text-foreground"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                    data-testid={`button-role-${role.id}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${role.color}`}>
                      <role.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-tight">{role.label}</span>
                    {selectedRole === role.id && (
                      <CheckCircle2 className="w-4 h-4 ml-auto text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <Button
                className="w-full mt-3 gap-2 bg-gradient-to-r from-primary to-blue-500 border-0"
                disabled={!selectedRole}
                onClick={handleComplete}
                data-testid="button-gate-complete"
              >
                Get started
                <Sparkles className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground/60 text-center px-6 py-4">
          No spam. Your info is only used to personalise your experience.
        </p>
      </DialogContent>
    </Dialog>
  );
}

interface LockoutScreenProps {
  lockedUntil: number;
  onUnlockNow?: () => void;
}

export function LockoutScreen({ lockedUntil, onUnlockNow }: LockoutScreenProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, lockedUntil - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.max(0, lockedUntil - Date.now());
      setRemaining(r);
      if (r === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-20 px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Clock className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="font-bold text-xl">Automate UX is paused</h2>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          You closed the sign-up without completing it. Access will resume in:
        </p>
      </div>
      <div className="px-8 py-4 rounded-2xl bg-muted border border-border font-mono text-4xl font-bold tracking-widest text-foreground" data-testid="text-lockout-countdown">
        {formatCountdown(remaining)}
      </div>

      {onUnlockNow && (
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Don't want to wait?{" "}
          <button
            onClick={onUnlockNow}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors"
            data-testid="button-unlock-now"
          >
            Provide your information now
          </button>{" "}
          to get immediate access.
        </p>
      )}

      <div className="max-w-sm space-y-3">
        <p className="text-sm text-muted-foreground">
          In the meantime, you can still use all other DesignFlow Kit features.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" /> Dashboard
            </Button>
          </Link>
          <Link href="/sprint-board">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Sprint Board
            </Button>
          </Link>
          <Link href="/integrations">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Integrations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
