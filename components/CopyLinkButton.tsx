"use client";

import { useCallback, useState } from "react";
import { noteAbsoluteUrl } from "@/lib/note-url";

export function CopyLinkButton({ noteId }: { noteId: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const url = noteAbsoluteUrl(noteId);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [noteId]);

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md px-2.5 py-1 text-[12px] font-medium text-[var(--muted)] transition-colors duration-150 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
    >
      {copied ? "Copiado" : "Copiar link"}
    </button>
  );
}
