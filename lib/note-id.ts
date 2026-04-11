/**
 * Um segmento de URL (/pai ou /pai/filho).
 * Letras (Unicode), números, _ e hífen; 1–128 caracteres.
 */
const NOTE_ID_RE = /^[\p{L}\p{N}_-]{1,128}$/u;

export function isValidNoteId(id: string): boolean {
  if (!id || id.length > 128) return false;
  return NOTE_ID_RE.test(id);
}

/** Caminho com 1 segmento (nota raiz) ou 2 (subpágina). */
export function isValidNotePathSegments(segments: string[]): boolean {
  if (segments.length < 1 || segments.length > 2) return false;
  return segments.every(isValidNoteId);
}

export function segmentsToNoteId(segments: string[]): string {
  return segments.join("/");
}

/**
 * Normaliza o texto da página inicial para um segmento de URL seguro.
 */
export function slugifyNoteName(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, "-");
  return trimmed.replace(/[^\p{L}\p{N}_-]+/gu, "").slice(0, 128);
}

/**
 * Aceita "nome" ou "pai/filho" (no máximo dois níveis).
 * Devolve null se ficar vazio ou tiver mais de dois níveis.
 */
export function slugifyNotePath(raw: string): string | null {
  const parts = raw
    .split("/")
    .map((p) => slugifyNoteName(p))
    .filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length > 2) return null;
  if (!isValidNotePathSegments(parts)) return null;
  return parts.join("/");
}
