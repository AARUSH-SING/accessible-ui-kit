import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Rename workspace</Button>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            initialRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
            <DialogDescription>
              Focus is trapped inside this dialog and returns to the trigger on close.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace name</Label>
            <Input id="workspace-name" ref={initialRef} defaultValue="Design system" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setStatus("Workspace renamed.");
                setOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p aria-live="polite" className="text-sm font-medium text-primary">
        {status}
      </p>

      <p className="text-sm text-muted-foreground">
        Try it with the keyboard: <span className="kbd-key">Tab</span>{" "}
        <span className="kbd-key">Shift + Tab</span> cycle inside,{" "}
        <span className="kbd-key">Esc</span> closes.
      </p>
    </div>
  );
}
