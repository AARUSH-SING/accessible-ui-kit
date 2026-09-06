import { useRef } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "a11y-kit";

/**
 * Focus-managed dialog: focus moves to the first field on open,
 * is trapped while open, and returns to the trigger on close.
 */
export function RenameDialogExample() {
  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
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
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
