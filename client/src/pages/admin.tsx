import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lock, Users, BookmarkCheck, ExternalLink, RefreshCw, Eye, EyeOff, Copy, Check, LogOut } from "lucide-react";

interface AdminSession {
  token: string;
  email: string;
  toolId: string;
  toolPath: string;
  toolLabel: string;
  savedAt: number;
  messageCount: number;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button onClick={handleCopy} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Copy link">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [submittedKey, setSubmittedKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const isLoggedIn = !!submittedKey;

  const { data, isLoading, isError, refetch } = useQuery<AdminSession[]>({
    queryKey: ["/api/admin/sessions", submittedKey],
    enabled: isLoggedIn,
    retry: false,
    queryFn: async () => {
      const res = await fetch(`/api/admin/sessions?key=${encodeURIComponent(submittedKey)}`);
      if (res.status === 401) throw new Error("unauthorized");
      if (!res.ok) throw new Error("error");
      return res.json();
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoginError("");
    setSubmittedKey(password.trim());
  }

  if (isError && isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="font-semibold text-base mb-2">Access denied</h2>
          <p className="text-sm text-muted-foreground mb-4">The password you entered is incorrect.</p>
          <button
            onClick={() => { setSubmittedKey(""); setPassword(""); setLoginError("Wrong password."); }}
            className="px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">DesignFlow Kit · Session tracker</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Admin password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full pl-9 pr-9 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/50"
                  data-testid="input-admin-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {loginError && <p className="text-xs text-red-500 mt-1.5">{loginError}</p>}
            </div>
            <button
              type="submit"
              disabled={!password.trim()}
              className="w-full py-2.5 rounded-xl bg-foreground text-background text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
              data-testid="button-admin-login"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sessions = data ?? [];
  const uniqueEmails = new Set(sessions.map((s) => s.email)).size;
  const tools = Array.from(new Set(sessions.map((s) => s.toolLabel)));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <BookmarkCheck className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Saved sessions tracker</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            data-testid="button-admin-refresh"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => { setSubmittedKey(""); setPassword(""); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-3 h-3" />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/40 border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookmarkCheck className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Total sessions</span>
            </div>
            <p className="text-3xl font-bold tabular-nums" data-testid="stat-total-sessions">{sessions.length}</p>
          </div>
          <div className="bg-muted/40 border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Unique emails</span>
            </div>
            <p className="text-3xl font-bold tabular-nums" data-testid="stat-unique-emails">{uniqueEmails}</p>
          </div>
          <div className="bg-muted/40 border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookmarkCheck className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Tools used</span>
            </div>
            <p className="text-3xl font-bold tabular-nums" data-testid="stat-tools-used">{tools.length}</p>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookmarkCheck className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No sessions saved yet.</p>
            <p className="text-xs mt-1 opacity-60">When users save sessions, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_1fr_140px_100px_80px] gap-4 px-4 py-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
              <span>Email</span>
              <span>Tool</span>
              <span>Saved at</span>
              <span>Messages</span>
              <span>Link</span>
            </div>
            {sessions
              .slice()
              .sort((a, b) => b.savedAt - a.savedAt)
              .map((session) => {
                const resumeUrl = `${window.location.origin}${session.toolPath}?resume=${session.token}`;
                return (
                  <div
                    key={session.token}
                    className="grid grid-cols-[1fr_1fr_140px_100px_80px] gap-4 items-center px-4 py-3 bg-muted/20 hover:bg-muted/40 border border-border rounded-xl transition-colors"
                    data-testid={`row-session-${session.token}`}
                  >
                    <span className="text-sm font-medium truncate" data-testid={`text-email-${session.token}`}>
                      {session.email}
                    </span>
                    <span className="text-sm text-muted-foreground truncate">{session.toolLabel}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(session.savedAt)}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">{session.messageCount} msgs</span>
                    <div className="flex items-center gap-1">
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Open session"
                        data-testid={`link-resume-${session.token}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <CopyButton text={resumeUrl} />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
