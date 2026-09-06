import { useId, useRef, useState } from "react";
import { Button, Input, Label, Textarea } from "a11y-kit";

/**
 * Accessible form: explicit labels, aria-describedby hints/errors,
 * and an assertive error summary that receives focus on invalid submit.
 */
export function ContactFormExample() {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next: typeof errors = {};
    if (!name) next.name = "Enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus(`Thanks ${name}, your request was submitted.`);
    event.currentTarget.reset();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div ref={summaryRef} tabIndex={-1} role="alert" className={errors.name || errors.email ? "" : "sr-only"}>
        {Object.values(errors).map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor={nameId}>Full name (required)</Label>
        <Input id={nameId} name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={emailId}>Email (required)</Label>
        <Input id={emailId} name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${baseId}-message`}>Message</Label>
        <Textarea id={`${baseId}-message`} name="message" rows={3} />
      </div>

      <Button type="submit">Submit request</Button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
