import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <p className="text-sm text-[var(--muted)]">Este endereço não é válido.</p>
      <Link
        href="/"
        className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
      >
        Voltar e escolher o nome da nota
      </Link>
    </div>
  );
}
