import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  notes: string[];
  children: ReactNode;
}

export function Section({ id, eyebrow, title, description, notes, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-t border-border py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="mt-3 text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-prose text-muted-foreground">{description}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">{children}</div>
      </div>
    </section>
  );
}
