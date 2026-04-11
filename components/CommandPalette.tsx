"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { noteAbsoluteUrl } from "@/lib/note-url";

type Action = { id: string; label: string; shortcut?: string; run: () => void };

export function CommandPalette({
  open,
  onClose,
  noteId,
}: {
  open: boolean;
  onClose: () => void;
  noteId: string;
}) {
  const router = useRouter();

  const copyLink = useCallback(async () => {
    const url = noteAbsoluteUrl(noteId);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    onClose();
  }, [noteId, onClose]);

  const newNote = useCallback(() => {
    onClose();
    router.push("/");
  }, [onClose, router]);

  const actions: Action[] = [
    { id: "copy", label: "Copiar link da nota", shortcut: "Enter", run: copyLink },
    { id: "new", label: "Nova nota", run: newNote },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Ações rápidas"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/40 motion-safe:animate-[palette-in_0.15s_ease-out]">
        <div className="border-b border-[var(--border)] px-3 py-2">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">
            Atalhos
          </p>
        </div>
        <ul className="py-1">
          {actions.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => a.run()}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[13px] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:bg-[var(--surface-hover)] focus-visible:outline-none"
              >
                <span>{a.label}</span>
                {a.shortcut ? (
                  <kbd className="rounded border border-[var(--border)] bg-[var(--elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
                    {a.shortcut}
                  </kbd>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--border)] px-3 py-2 text-[11px] text-[var(--muted)]">
          Ctrl+K para abrir · Esc para fechar
        </p>
      </div>
    </div>
  );
}
