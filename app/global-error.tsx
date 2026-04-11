"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[var(--background)] px-6 py-16 font-sans text-[var(--foreground)] antialiased">
        <div className="mx-auto max-w-md space-y-4">
          <h1 className="text-lg font-medium">Algo correu mal</h1>
          <p className="text-sm text-[var(--muted)]">
            {error.message || "Erro inesperado na aplicação."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)]"
          >
            Tentar outra vez
          </button>
        </div>
      </body>
    </html>
  );
}
