"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6">
      <p className="text-sm text-[var(--muted)]">
        {error.message || "Não foi possível mostrar esta página."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)]"
      >
        Tentar outra vez
      </button>
    </div>
  );
}
