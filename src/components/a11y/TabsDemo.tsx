import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const panels = [
  {
    value: "keyboard",
    label: "Keyboard",
    body: "Arrow keys move between tabs, Home and End jump to the first and last tab, and only the active tab is in the page tab order.",
  },
  {
    value: "screen-reader",
    label: "Screen reader",
    body: "Each tab is linked to its panel with aria-controls, and the selected state is announced through aria-selected.",
  },
  {
    value: "testing",
    label: "Testing",
    body: "Verified with NVDA browse and focus modes, keyboard-only walkthroughs, and automated axe-core checks in CI.",
  },
];

export function TabsDemo() {
  return (
    <Tabs defaultValue="keyboard" className="w-full">
      <TabsList className="w-full justify-start">
        {panels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>
            {panel.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value} className="pt-4 text-sm leading-relaxed">
          {panel.body}
        </TabsContent>
      ))}
    </Tabs>
  );
}
