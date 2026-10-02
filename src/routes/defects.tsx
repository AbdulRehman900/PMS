import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Pill } from "@/components/Shell";
import { AddForm } from "@/components/AddForm";
import { defects as seed } from "@/lib/pms-data";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/defects")({
  head: () => ({
    meta: [
      { title: "Defects — Bridgeline Marine PMS" },
      { name: "description", content: "Reported equipment defects and corrective maintenance status." },
      { property: "og:title", content: "Defects — Bridgeline Marine PMS" },
      { property: "og:description", content: "Reported equipment defects and corrective maintenance status." },
    ],
  }),
  component: DefectsPage,
});

function DefectsPage() {
  const [list, setList] = useDemo("defects", seed);
  return (
    <Shell title="Defects">
      <div className="mb-4 flex justify-end">
        <AddForm
          title="Report defect"
          fields={[
            { name: "title", label: "Description" },
            { name: "equipment", label: "Equipment" },
            { name: "severity", label: "Severity", type: "select", options: ["Low", "Medium", "High"] },
            { name: "status", label: "Status", type: "select", options: ["Open", "Under repair", "Awaiting spares", "Closed"] },
          ]}
          onAdd={(v) =>
            setList([{ id: `DEF-${String(32 + list.length).padStart(3, "0")}`, title: v.title!, equipment: v.equipment!, severity: v.severity!, status: v.status!, reported: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }) }, ...list])
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <Card key={d.id}>
            <div className="flex justify-between"><span className="font-mono text-xs text-muted-foreground">{d.id}</span><Pill v={d.severity} /></div>
            <h3 className="mt-3 font-medium">{d.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground">{d.equipment}</div>
            <div className="mt-4 flex justify-between border-t border-border pt-3 text-xs">
              <span>Reported {d.reported}</span><span className="text-primary">{d.status}</span>
            </div>
            <button onClick={() => setList(list.filter((x) => x.id !== d.id))} className="mt-3 text-xs text-muted-foreground hover:text-destructive">Delete</button>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
