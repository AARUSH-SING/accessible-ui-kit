import { createFileRoute } from "@tanstack/react-router";
import { Accessibility, Keyboard, ScanEye, Volume2 } from "lucide-react";
import { Section } from "@/components/a11y/Section";
import { FormDemo } from "@/components/a11y/FormDemo";
import { DialogDemo } from "@/components/a11y/DialogDemo";
import { TabsDemo } from "@/components/a11y/TabsDemo";
import { MenuDemo } from "@/components/a11y/MenuDemo";
import { AuditDemo } from "@/components/a11y/AuditDemo";

const title = "Accessible React Component Library — WCAG-aligned UI patterns";
const description =
  "A React + TypeScript component library built to WCAG and WAI-ARIA: keyboard navigation, focus management, accessible forms, dialogs, tabs and menus, tested with NVDA and axe-core.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const stats = [
  { label: "WCAG 2.2 AA", value: "Conformance target", icon: Accessibility },
  { label: "Keyboard-only", value: "Every pattern operable", icon: Keyboard },
  { label: "NVDA", value: "Manual screen reader passes", icon: Volume2 },
  { label: "axe-core", value: "Automated checks in CI", icon: ScanEye },
];

const nav = [
  { href: "#forms", label: "Forms" },
  { href: "#dialog", label: "Dialog" },
  { href: "#tabs", label: "Tabs" },
  { href: "#menu", label: "Menu" },
  { href: "#audit", label: "Audit log" },
];

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <p className="font-display text-base font-semibold tracking-tight">
            a11y<span className="text-primary">/kit</span>
          </p>
          <nav aria-label="Component sections">
            <ul className="flex flex-wrap gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-6 pb-24">
        <section aria-labelledby="hero-heading" className="py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            React · TypeScript · WAI-ARIA
          </p>
          <h1 id="hero-heading" className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
            An accessible React component library, built for people who never touch a mouse.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Reusable components with semantic HTML, predictable keyboard navigation and deliberate
            focus management — verified with NVDA, keyboard-only walkthroughs and automated
            accessibility tooling.
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <stat.icon aria-hidden="true" className="size-5 text-primary" />
                <dt className="mt-3 text-sm font-semibold">{stat.label}</dt>
                <dd className="text-sm text-muted-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section
          id="forms"
          eyebrow="Forms"
          title="Forms that explain themselves"
          description="Every control has a real label, hints and errors are wired through aria-describedby, and submitting an invalid form moves focus to a live error summary."
          notes={[
            "Labels use htmlFor with ids generated per instance, so repeated forms never collide.",
            "Errors set aria-invalid and are announced through an assertive live region.",
            "Error summary links jump focus straight to the field that needs fixing.",
          ]}
        >
          <FormDemo />
        </Section>

        <Section
          id="dialog"
          eyebrow="Dialog"
          title="Focus goes where you expect"
          description="The modal traps focus, sends it to a sensible first control on open, and restores it to the trigger on close — with Escape and background clicks both supported."
          notes={[
            "Title and description are linked with aria-labelledby and aria-describedby.",
            "Content behind the dialog is inert and hidden from screen readers.",
            "Return focus is guaranteed, so keyboard users never lose their place.",
          ]}
        >
          <DialogDemo />
        </Section>

        <Section
          id="tabs"
          eyebrow="Tabs"
          title="Roving focus, one stop in the tab order"
          description="The tab list follows the WAI-ARIA authoring practices: arrow keys move between tabs and a single Tab press moves on to the panel."
          notes={[
            "role=tablist, role=tab and role=tabpanel with matching aria-controls.",
            "Home and End jump to the first and last tab.",
            "Selected state is conveyed by aria-selected, not colour alone.",
          ]}
        >
          <TabsDemo />
        </Section>

        <Section
          id="menu"
          eyebrow="Menu"
          title="Menus with real menu semantics"
          description="An action menu that opens on Enter or Space, supports arrow-key roaming and type-ahead, and closes back onto its trigger."
          notes={[
            "aria-expanded and aria-haspopup keep the trigger state announced.",
            "Destructive items are labelled, not just coloured red.",
            "Selected actions report back through a polite live region.",
          ]}
        >
          <MenuDemo />
        </Section>

        <Section
          id="audit"
          eyebrow="Testing"
          title="Violations found, and what fixed them"
          description="A sample of issues surfaced by axe-core and NVDA passes during development, each paired with the remediation that shipped."
          notes={[
            "Automated axe-core runs on every component story in CI.",
            "Manual NVDA passes cover browse mode and focus mode separately.",
            "Keyboard-only walkthroughs check every interactive path end to end.",
          ]}
        >
          <AuditDemo />
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          Built with React, TypeScript and Radix primitives. Accessibility is a requirement, not a
          feature flag.
        </div>
      </footer>
    </div>
  );
}
