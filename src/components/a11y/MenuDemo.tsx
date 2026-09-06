import { useState } from "react";
import { ChevronDown, Copy, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MenuDemo() {
  const [status, setStatus] = useState("");

  return (
    <div className="space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Document actions
            <ChevronDown aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setStatus("Document duplicated.")}>
            <Copy aria-hidden="true" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setStatus("Export started.")}>
            <Download aria-hidden="true" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setStatus("Document moved to trash.")}
          >
            <Trash2 aria-hidden="true" />
            Move to trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <p aria-live="polite" className="text-sm font-medium text-primary">
        {status}
      </p>

      <p className="text-sm text-muted-foreground">
        <span className="kbd-key">Enter</span> or{" "}
        <span className="kbd-key">Space</span> opens the menu,{" "}
        <span className="kbd-key">&uarr;</span> <span className="kbd-key">&darr;</span> roam it, and
        typing a letter jumps to a matching item.
      </p>
    </div>
  );
}
