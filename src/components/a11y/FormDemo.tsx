import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Errors {
  name?: string;
  email?: string;
}

export function FormDemo() {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setStatus("");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus(`Thanks ${name}, your request was submitted.`);
    event.currentTarget.reset();
  }

  const errorList = Object.entries(errors);

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={
          errorList.length > 0
            ? "rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive"
            : "sr-only"
        }
      >
        {errorList.length > 0 ? (
          <>
            <p className="font-semibold">There are {errorList.length} problems with this form:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a className="underline" href={`#${baseId}-${field}`}>
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={nameId}>
          Full name <span className="text-muted-foreground">(required)</span>
        </Label>
        <Input
          id={nameId}
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
        />
        {errors.name ? (
          <p id={`${nameId}-error`} className="text-sm font-medium text-destructive">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={emailId}>
          Email <span className="text-muted-foreground">(required)</span>
        </Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? `${emailId}-error ${emailId}-hint` : `${emailId}-hint`
          }
        />
        <p id={`${emailId}-hint`} className="text-sm text-muted-foreground">
          We only use this to reply to your request.
        </p>
        {errors.email ? (
          <p id={`${emailId}-error`} className="text-sm font-medium text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={messageId}>Message</Label>
        <Textarea id={messageId} name="message" rows={3} />
      </div>

      <Button type="submit">Submit request</Button>

      <p aria-live="polite" className="text-sm font-medium text-primary">
        {status}
      </p>
    </form>
  );
}
