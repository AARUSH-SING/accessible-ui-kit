import { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Finding {
  id: string;
  rule: string;
  impact: "critical" | "serious" | "moderate";
  problem: string;
  fix: string;
}

const findings: Finding[] = [
  {
    id: "button-name",
    rule: "button-name",
    impact: "critical",
    problem: "Icon-only toolbar buttons shipped with no accessible name, so NVDA announced only \"button\".",
    fix: "Added descriptive aria-label values and marked the decorative icons aria-hidden.",
  },
  {
    id: "color-contrast",
    rule: "color-contrast",
    impact: "serious",
    problem: "Helper text at 3.1:1 failed WCAG 1.4.3 against the card surface.",
    fix: "Replaced ad-hoc greys with the muted-foreground token, now measured at 5.9:1.",
  },
  {
    id: "aria-dialog-name",
    rule: "aria-dialog-name",
    impact: "serious",
    problem: "The confirm dialog had no title reference, so its purpose was never announced on open.",
    fix: "Wired aria-labelledby and aria-describedby to the dialog title and description.",
  },
  {
    id: "duplicate-id-aria",
    rule: "duplicate-id-aria",
    impact: "moderate",
    problem: "Repeated list rows hardcoded the same field id, breaking label associations.",
    fix: "Generated per-instance ids with useId so every label points at one input.",
  },
];

const impactStyles: Record<Finding["impact"], string> = {
  critical: "bg-destructive/12 text-destructive border-destructive/40",
  serious: "bg-accent text-accent-foreground border-accent-foreground/30",
  moderate: "bg-secondary text-secondary-foreground border-border",
};

export function AuditDemo() {
  const [resolved, setResolved] = useState<string[]>([]);
  const allResolved = resolved.length === findings.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
          {resolved.length} of {findings.length} violations remediated
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setResolved(allResolved ? [] : findings.map((f) => f.id))}
        >
          {allResolved ? "Reset audit" : "Mark all fixed"}
        </Button>
      </div>

      <ul className="space-y-3">
        {findings.map((finding) => {
          const done = resolved.includes(finding.id);
          return (
            <li key={finding.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <code className="text-sm font-semibold">{finding.rule}</code>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${impactStyles[finding.impact]}`}
                >
                  {finding.impact}
                </span>
              </div>
              <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {finding.problem}
              </p>
              <p className="mt-2 flex gap-2 text-sm">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                {finding.fix}
              </p>
              <div className="mt-3">
                <Button
                  size="sm"
                  variant={done ? "secondary" : "outline"}
                  aria-pressed={done}
                  onClick={() =>
                    setResolved((prev) =>
                      done ? prev.filter((id) => id !== finding.id) : [...prev, finding.id],
                    )
                  }
                >
                  {done ? "Fixed" : "Mark as fixed"}
                  <span className="sr-only"> — {finding.rule}</span>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="text-sm font-medium text-primary">
        {allResolved ? "All axe-core violations cleared for this component set." : ""}
      </p>
    </div>
  );
}
