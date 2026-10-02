import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Card, Pill } from "@/components/Shell";
import { workOrders, defects, spares, vessels } from "@/lib/pms-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Bridgeline Marine PMS" },
      { name: "description", content: "Planned maintenance overview for your fleet: overdue jobs, defects and spares." },
      { property: "og:title", content: "Dashboard — Bridgeline Marine PMS" },
      { property: "og:description", content: "Planned maintenance overview for your fleet." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const overdue = workOrders.filter((w) => w.status === "overdue").length;
  const due = workOrders.filter((w) => w.status === "due").length;
  const low = spares.filter((s) => s.onHand < s.min).length;
  const stats = [
    { l: "Overdue jobs", v: overdue, c: "text-destructive" },
    { l: "Due within 7 days", v: due, c: "text-warning" },
    { l: "Open defects", v: defects.length, c: "text-foreground" },
    { l: "Spares below min", v: low, c: "text-warning" },
  ];
  return (
    <Shell title="Fleet Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.l}>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className={`mt-2 font-mono text-4xl ${s.c}`}>{s.v}</div>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex justify-between"><h2 className="font-display text-lg">Upcoming maintenance</h2><Link to="/work-orders" className="text-sm text-primary">View all</Link></div>
          <div className="divide-y divide-border">
            {workOrders.filter((w) => w.status !== "done").map((w) => (
              <div key={w.id} className="flex items-center justify-between gap-4 py-3">
                <div><div className="text-sm">{w.title}</div><div className="font-mono text-xs text-muted-foreground">{w.id} · {w.due}</div></div>
                <Pill v={w.status} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-lg">Fleet</h2>
          {vessels.map((v) => (
            <div key={v.id} className="mb-3 rounded-lg border border-border p-3">
              <div className="font-medium">{v.name}</div>
              <div className="font-mono text-xs text-muted-foreground">{v.type} · {v.flag} · {v.status}</div>
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
}
