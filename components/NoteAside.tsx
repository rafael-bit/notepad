"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { slugifyNoteName } from "@/lib/note-id";
import { noteWebPath } from "@/lib/note-url";

export function NoteAside({ parentId }: { parentId: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [newPageName, setNewPageName] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/note/subpages?parent=${encodeURIComponent(parentId)}`
      );
      if (!res.ok) return;
      const data = (await res.json()) as { slugs?: string[] };
      setSlugs(data.slugs ?? []);
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load, pathname]);

  useEffect(() => {
    const onIndexUpdate = (e: Event) => {
      const d = (e as CustomEvent<{ parent: string }>).detail;
      if (d?.parent === parentId) void load();
    };
    window.addEventListener("notepad:index-update", onIndexUpdate);
    return () => window.removeEventListener("notepad:index-update", onIndexUpdate);
  }, [parentId, load]);

  const parentPath = noteWebPath(parentId);
  const onMainPage = pathname === parentPath;

  const addPage = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugifyNoteName(newPageName);
    if (!slug) return;
    setNewPageName("");
    router.push(noteWebPath(`${parentId}/${slug}`));
  };

  return (
    <aside className="flex shrink-0 flex-col border-b border-[var(--border)] bg-[var(--elevated)] md:w-52 md:border-b-0 md:border-r md:min-h-screen">
      <p className="px-3 pt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
        Páginas
      </p>

      <nav
        className="flex flex-row gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:overflow-x-visible md:px-2 md:pb-3"
        aria-label="Subpáginas"
      >
        <Link
          href={parentPath}
          className={`shrink-0 rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors md:px-2.5 ${
            onMainPage
              ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
              : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          }`}
        >
          Principal
        </Link>
        {loading ? (
          <span className="px-2.5 py-1.5 text-[12px] text-[var(--muted)]">…</span>
        ) : (
          slugs.map((slug) => {
            const href = noteWebPath(`${parentId}/${slug}`);
            const active = pathname === href;
            return (
              <Link
                key={slug}
                href={href}
                className={`shrink-0 truncate rounded-md px-2.5 py-1.5 text-left font-mono text-[12px] transition-colors md:px-2.5 ${
                  active
                    ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                }`}
                title={slug}
              >
                {slug}
              </Link>
            );
          })
        )}
      </nav>

      <form
        onSubmit={addPage}
        className="mt-auto flex flex-col gap-2 border-t border-[var(--border)] p-3"
      >
        <label htmlFor="new-subpage" className="sr-only">
          Nova subpágina
        </label>
        <input
          id="new-subpage"
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          placeholder="Nova página…"
          className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 font-mono text-[12px] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--ring)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="rounded-md bg-[var(--foreground)] py-1.5 text-[11px] font-medium text-[var(--background)] hover:opacity-90"
        >
          Abrir / criar
        </button>
      </form>
    </aside>
  );
}
