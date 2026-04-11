"use client";

type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveIndicator({ state }: { state: SaveState }) {
  const label =
    state === "saving"
      ? "Salvando…"
      : state === "saved"
        ? "Salvo"
        : state === "error"
          ? "Erro ao salvar"
          : "";

  if (!label) return null;

  return (
    <span
      className={`text-[11px] font-medium tracking-wide transition-colors duration-200 ${
        state === "error"
          ? "text-[var(--danger)]"
          : state === "saving"
            ? "text-[var(--muted)]"
            : "text-[var(--muted)]"
      }`}
      role="status"
      aria-live="polite"
    >
      {label}
    </span>
  );
}
