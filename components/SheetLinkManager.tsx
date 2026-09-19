"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import GoogleSheetButton from "@/components/GoogleSheetButton";
import CopyLinkButton from "@/components/CopyLinkButton";

// Client-side gate only — this is NOT real security. The password lives in the
// bundle and localStorage is per-browser, so this just stops casual editing,
// not a determined visitor. Wire up a real backend before relying on this.
const ADMIN_PASSWORD = "Changeme@123";
const UPDATE_EVENT = "sheet-link-updated";

function readStoredUrl(storageKey: string): string | null {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function writeStoredUrl(storageKey: string, value: string) {
  try {
    if (value) {
      window.localStorage.setItem(storageKey, value);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export default function SheetLinkManager({
  storageKey,
  initialUrl,
}: {
  storageKey: string;
  initialUrl: string;
}) {
  const storedUrl = useSyncExternalStore(
    subscribe,
    () => readStoredUrl(storageKey),
    () => null
  );
  const url = storedUrl ?? initialUrl;

  const [panelOpen, setPanelOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [draftUrl, setDraftUrl] = useState("");

  function openPanel() {
    setDraftUrl(url);
    setPassword("");
    setPasswordError(false);
    setUnlocked(false);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();
    writeStoredUrl(storageKey, draftUrl.trim());
    setPanelOpen(false);
  }

  function handleRemove() {
    writeStoredUrl(storageKey, "");
    setPanelOpen(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <GoogleSheetButton sheetUrl={url} />
        </div>
        {url && <CopyLinkButton url={url} />}
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
          {url ? "Change Sheet Link" : "Add Sheet Link"}
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
                  className="h-9 flex-1 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Unlock
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
              <div className="mt-1 flex gap-2">
                <button
                  type="submit"
                  className="h-9 flex-1 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Save
                </button>
                {url && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:border-error hover:text-error"
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={closePanel}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-text"
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
