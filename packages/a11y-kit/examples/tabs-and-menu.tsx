import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "a11y-kit";

/** Arrow-key roaming tabs following the WAI-ARIA tabs pattern. */
export function TabsExample() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings panel.</TabsContent>
      <TabsContent value="security">Security settings panel.</TabsContent>
    </Tabs>
  );
}

/** Action menu: Enter/Space opens, arrows roam, letters type-ahead. */
export function MenuExample() {
  const [status, setStatus] = useState("");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Document actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setStatus("Document duplicated.")}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setStatus("Document moved to trash.")}>
            Move to trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p aria-live="polite">{status}</p>
    </>
  );
}
