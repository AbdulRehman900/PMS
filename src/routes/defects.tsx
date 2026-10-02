import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Pill } from "@/components/Shell";
import { defects } from "@/lib/pms-data";

export const Route = createFileRoute("/defects")({
  head: () => ({
    meta: [
      { title: "Defects — Bridgeline Marine PMS" },
      { name: "description", content: "Reported equipment defects and corrective maintenance status." },
      { property: "og:title", content: "Defects — Bridgeline Marine PMS" },
      { property: "og:description", content: "Reported equipment defects and corrective maintenance status." },
    ],
  }),
  component: () => (
    <Shell title="Defects">
      <div className="grid gap-4 md:grid-cols-3">
        {defects.map((d) => (
          <Card key={d.id}>
            <div className="flex justify-between"><span className="font-mono text-xs text-muted-foreground">{d.id}</span><Pill v={d.severity} /></div>
            <h3 className="mt-3 font-medium">{d.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground">{d.equipment}</div>
            <div className="mt-4 flex justify-between border-t border-border pt-3 text-xs"><span>Reported {d.reported}</span><span className="text-primary">{d.status}</span></div>
          </Card>
        ))}
      </div>
    </Shell>
  ),
});
