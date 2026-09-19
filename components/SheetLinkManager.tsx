"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import GoogleSheetButton from "@/components/GoogleSheetButton";
import CopyLinkButton from "@/components/CopyLinkButton";

export default function SheetLinkManager({
  plantSlug,
  block,
  department,
  initialUrl,
}: {
  plantSlug: string;
  block: string;
  department: string;
  initialUrl: string;
}) {
  const router = useRouter();

  const [panelOpen, setPanelOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [draftUrl, setDraftUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function openPanel() {
    setDraftUrl(initialUrl);
    setPassword("");
    setPasswordError(false);
    setSaveError("");
    setUnlocked(false);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setPasswordError(false);
    try {
      const res = await fetch("/api/sheet-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", password }),
      });
      if (res.ok) {
        setUnlocked(true);
      } else {
        setPasswordError(true);
      }
    } catch {
      setPasswordError(true);
    } finally {
      setVerifying(false);
    }
  }

  async function persist(url: string) {
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/sheet-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          plant: plantSlug,
          block,
          department,
          url,
          password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSaveError(data.error ?? "Could not save. Please try again.");
        return;
      }
      setPanelOpen(false);
      router.refresh();
    } catch {
      setSaveError("Could not reach the server. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();
    persist(draftUrl.trim());
  }

  function handleRemove() {
    persist("");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <GoogleSheetButton sheetUrl={initialUrl} />
        </div>
        {initialUrl && <CopyLinkButton url={initialUrl} />}
      </div>

      {!panelOpen ? (
        <button
          type="button"
          onClick={openPanel}
          className="inline-flex w-fit items-center gap-1.5 self-start text-xs font-medium text-muted transition-colors hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H20a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          {initialUrl ? "Change Sheet Link" : "Add Sheet Link"}
        </button>
      ) : (
        <div className="animate-fade-in-up rounded-xl border border-border bg-background p-4">
          {!unlocked ? (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted" htmlFor="sheet-admin-password">
                Enter admin password to edit this link
              </label>
              <input
                id="sheet-admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text outline-none focus:border-primary"
                placeholder="Password"
                autoFocus
              />
              {passwordError && <p className="text-xs text-error">Incorrect password.</p>}
              <div className="mt-1 flex gap-2">
                <button
                  type="submit"
                  disabled={verifying}
                  className="h-9 flex-1 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
                >
                  {verifying ? "Checking…" : "Unlock"}
                </button>
                <button
                  type="button"
                  onClick={closePanel}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-text"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted" htmlFor="sheet-url-input">
                Google Sheet URL
              </label>
              <input
                id="sheet-url-input"
                type="url"
                value={draftUrl}
                onChange={(e) => setDraftUrl(e.target.value)}
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text outline-none focus:border-primary"
                placeholder="https://docs.google.com/spreadsheets/..."
                autoFocus
              />
              {saveError && <p className="text-xs text-error">{saveError}</p>}
              <div className="mt-1 flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-9 flex-1 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                {initialUrl && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    disabled={saving}
                    className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:border-error hover:text-error disabled:opacity-60"
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={closePanel}
                  disabled={saving}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-text disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
