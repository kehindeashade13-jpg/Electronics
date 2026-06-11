import { useState, FormEvent } from "react";
import { X, Lock, Key, AlertCircle } from "lucide-react";

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminAuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminAuthModalProps) {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      onSuccess();
      setPassword("");
      setErrorMsg("");
      onClose();
    } else {
      setErrorMsg("Unauthorized Access Key. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02050b]/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-900 bg-[#070b14] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          id="close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Lock visual indicator */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c1324] text-cyan-400 border border-slate-800">
          <Lock className="h-5 w-5 hover:scale-110 transition-transform" />
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-display text-sm font-bold text-white sm:text-base">
            Authorized Personnel Only
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed text-center">
            Enter the admin password key to configure prices, delete items, or publish new listings.
          </p>
        </div>

        {/* Password Submission Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Key className="h-4 w-4 text-slate-500" />
            </span>
            <input
              id="admin-auth-pass-input"
              type="password"
              placeholder="e.g. admin123"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              className="w-full rounded-xl border border-slate-800 bg-[#0c1221] py-2.5 pl-9 pr-4 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
              required
              autoFocus
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 rounded-lg bg-red-950/20 border border-red-900/40 px-3 py-2 text-[11px] text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              id="admin-auth-cancel"
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-slate-900 border border-slate-800 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-[#0c1324]"
            >
              Cancel
            </button>
            <button
              id="admin-auth-submit"
              type="submit"
              className="flex-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 text-xs font-bold text-black"
            >
              Authorize
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-[9px] font-mono text-slate-600">
            Hint: Use standard credentials &apos;admin123&apos;
          </span>
        </div>
      </div>
    </div>
  );
}
