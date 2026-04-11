"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { slugifyNotePath } from "@/lib/note-id";
import { noteWebPath } from "@/lib/note-url";

export function HomeEntry() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const goToNote = useCallback(
    (raw: string) => {
      const path = slugifyNotePath(raw);
      if (!path) {
        setError(
          "Use letras ou números. Para subpágina: bloco/sub (no máximo dois níveis)."
        );
        return;
      }
      setError(null);
      router.push(noteWebPath(path));
    },
    [router]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNote(value);
  };

  const randomNote = () => {
    setError(null);
    router.push(noteWebPath(nanoid()));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 pb-24 pt-16">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-lg font-medium tracking-tight text-[var(--foreground)]">
            Notepad
          </h1>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">
            Escolha um nome para a sua nota. Depois pode voltar sempre com o mesmo endereço — na barra do
            navegador ou pelo link que copiar.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-left">
          <label htmlFor="note-name" className="sr-only">
            Nome da nota
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <input
              id="note-name"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              placeholder="ex.: lista-compras ou projeto/rascunho"
              autoComplete="off"
              spellCheck={false}
              className="min-h-11 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 font-mono text-[15px] text-[var(--foreground)] placeholder:text-[var(--muted)] transition-shadow duration-150 focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-lg bg-[var(--foreground)] px-5 text-[13px] font-medium text-[var(--background)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            >
              Abrir
            </button>
          </div>
          {error ? (
            <p className="text-[12px] text-[var(--danger)]" role="alert">
              {error}
            </p>
          ) : null}
        </form>

        <p className="text-[12px] text-[var(--muted)]">
          Na barra de endereço:{" "}
          <span className="font-mono text-[var(--foreground)]/80">…/bloco</span> ou{" "}
          <span className="font-mono text-[var(--foreground)]/80">…/bloco/sub</span>
          — a subpágina aparece na coluna à esquerda.
        </p>

        <button
          type="button"
          onClick={randomNote}
          className="text-[12px] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Preferir um link aleatório
        </button>
      </div>
    </div>
  );
}
