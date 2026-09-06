# a11y-kit

A WCAG-aligned React + TypeScript component library built on Radix UI primitives.
Every component ships with semantic HTML, predictable keyboard navigation and
deliberate focus management — the patterns are verified with NVDA, keyboard-only
walkthroughs and automated axe-core checks.

## What's inside

| Component       | Accessibility guarantees |
| --------------- | ------------------------ |
| `Button`        | Real `<button>`, visible focus ring, `asChild` polymorphism keeps semantics when rendering links. |
| `Input` / `Textarea` / `Label` | Designed for explicit `htmlFor` labelling, `aria-invalid` and `aria-describedby` hint/error wiring. |
| `Dialog`        | Focus trap, initial-focus control, Escape/outside-click close, guaranteed focus return to the trigger, `aria-labelledby`/`aria-describedby`. |
| `Tabs`          | WAI-ARIA tab pattern: arrow-key roaming, Home/End, single tab stop, `aria-selected` + `aria-controls`. |
| `DropdownMenu`  | Menu semantics with `aria-expanded`/`aria-haspopup`, arrow-key roaming, type-ahead, closes back onto the trigger. |
| `cn`            | `clsx` + `tailwind-merge` class combiner used across the kit. |

## Install

```sh
npm install a11y-kit
# peer deps
npm install react react-dom
```

## Setup

The components style themselves with semantic utility classes
(`bg-primary`, `text-muted-foreground`, `border-border`, ...). Two steps:

1. **Tailwind CSS v4** — make sure your stylesheet scans the package so the
   utilities are generated:

   ```css
   @import "tailwindcss";
   @source "../node_modules/a11y-kit/dist";
   ```

2. **Theme tokens** — import the bundled token sheet (or map the same CSS
   variable names onto your own design system). Light and dark (`.dark`)
   palettes are included and meet WCAG 2.2 AA contrast:

   ```css
   @import "a11y-kit/styles.css";
   ```

## Usage

### Accessible form with an error summary

```tsx
import { useRef, useState } from "react";
import { Button, Input, Label } from "a11y-kit";

export function SignupForm() {
  const [error, setError] = useState("");
  const summaryRef = useRef<HTMLParagraphElement>(null);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        const invalid = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email));
        setError(invalid ? "Enter a valid email address." : "");
        if (invalid) requestAnimationFrame(() => summaryRef.current?.focus());
      }}
      className="space-y-4"
    >
      {error && (
        <p ref={summaryRef} tabIndex={-1} role="alert" className="text-destructive">
          {error}
        </p>
      )}
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit">Sign up</Button>
    </form>
  );
}
```

### Focus-managed dialog

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "a11y-kit";

export function RenameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Rename workspace</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename workspace</DialogTitle>
          <DialogDescription>
            Focus is trapped here and returns to the trigger on close.
          </DialogDescription>
        </DialogHeader>
        {/* ... */}
      </DialogContent>
    </Dialog>
  );
}
```

### Arrow-key tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "a11y-kit";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Profile settings</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
    </Tabs>
  );
}
```

### Action menu

```tsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "a11y-kit";

export function DocumentMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Document actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => console.log("duplicate")}>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("trash")}>
          Move to trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

See runnable versions in [`examples/`](./examples).

## Testing recommendations

- Run axe-core against every component story in CI.
- Do a keyboard-only pass (Tab / Shift+Tab / arrows / Esc) on each flow.
- Verify with a screen reader (NVDA + Chrome) in both browse and focus modes.

## License

MIT
