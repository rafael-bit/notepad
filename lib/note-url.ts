/** Caminho da API para um id composto (ex.: pai/filho). */
export function noteApiPath(noteId: string): string {
  return `/api/note/${noteId.split("/").map(encodeURIComponent).join("/")}`;
}

/** Caminho na app (raiz) para partilhar ou navegar. */
export function noteWebPath(noteId: string): string {
  return `/${noteId.split("/").map(encodeURIComponent).join("/")}`;
}

/** URL absoluta da nota no browser. */
export function noteAbsoluteUrl(noteId: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${noteWebPath(noteId)}`;
}
