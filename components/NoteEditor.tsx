"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CommandPalette } from "@/components/CommandPalette";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { SaveIndicator } from "@/components/SaveIndicator";
import { noteApiPath } from "@/lib/note-url";

const DEBOUNCE_MS = 1600;

type SaveState = "idle" | "saving" | "saved" | "error";

type NotePayload = {
  id: string;
  content: string;
  updatedAt: number | null;
};

function indexParentForNote(noteId: string): string {
  const i = noteId.indexOf("/");
  return i === -1 ? noteId : noteId.slice(0, i);
}

export function NoteEditor({ noteId }: { noteId: string }) {
  const [content, setContent] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const contentRef = useRef(content);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastSavedRef = useRef<string>("");

  contentRef.current = content;

  const flushSave = useCallback(async () => {
    const text = contentRef.current;
    if (text === lastSavedRef.current) {
      setSaveState("idle");
      return;
    }
    setSaveState("saving");
    try {
      const res = await fetch(noteApiPath(noteId), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) throw new Error("save failed");
      lastSavedRef.current = text;
      setSaveState("saved");
      window.dispatchEvent(
        new CustomEvent("notepad:index-update", {
          detail: { parent: indexParentForNote(noteId) },
        })
      );
      window.setTimeout(() => {
        setSaveState((s) => (s === "saved" ? "idle" : s));
      }, 1600);
    } catch {
      setSaveState("error");
    }
  }, [noteId]);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
      void flushSave();
    }, DEBOUNCE_MS);
  }, [flushSave]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(noteApiPath(noteId));
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as NotePayload;
        if (cancelled) return;
        setContent(data.content ?? "");
        lastSavedRef.current = data.content ?? "";
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [noteId]);

  useLayoutEffect(() => {
    if (hydrated && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [hydrated]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    scheduleSave();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-sm text-[var(--muted)]">Não foi possível carregar esta nota.</p>
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-h-screen flex-col transition-opacity duration-200 ${
        hydrated ? "opacity-100" : "opacity-40"
      }`}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 backdrop-blur-md sm:px-6 supports-[backdrop-filter]:bg-[var(--background)]/65">
        <div className="flex items-center gap-1">
          <CopyLinkButton noteId={noteId} />
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator state={saveState} />
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="rounded-md px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            Ctrl+K
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        <TextareaAutosize
          ref={textareaRef}
          value={content}
          onChange={onChange}
          minRows={20}
          className="w-full resize-none bg-transparent font-mono text-[16px] leading-[1.7] text-[var(--foreground)] caret-[var(--accent)] placeholder:text-[var(--muted)] focus:outline-none selection:bg-[var(--selection)] sm:text-[17px] sm:leading-[1.75]"
          placeholder="Comece a escrever…"
          spellCheck={false}
          autoComplete="off"
          aria-label="Conteúdo da nota"
        />
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        noteId={noteId}
      />
    </div>
  );
}
