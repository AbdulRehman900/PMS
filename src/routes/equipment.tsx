import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, Card, Pill } from "@/components/Shell";
import { equipmentTree, workOrders, type Node } from "@/lib/pms-data";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment Hierarchy — Bridgeline Marine PMS" },
      { name: "description", content: "Browse vessel departments, systems, equipment and components." },
      { property: "og:title", content: "Equipment Hierarchy — Bridgeline Marine PMS" },
      { property: "og:description", content: "Browse vessel departments, systems, equipment and components." },
    ],
  }),
  component: EquipmentPage,
});

function Tree({ nodes, sel, onSel, depth = 0 }: { nodes: Node[]; sel?: Node; onSel: (n: Node) => void; depth?: number }) {
  return (
    <ul>
      {nodes.map((n) => (
        <li key={n.id}>
          <button onClick={() => onSel(n)} style={{ paddingLeft: depth * 16 + 8 }}
            className={`w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent ${sel?.id === n.id ? "bg-accent text-primary" : ""}`}>
            <span className="mr-2 font-mono text-xs text-muted-foreground">{n.children ? "▾" : "·"}</span>{n.name}
          </button>
          {n.children && <Tree nodes={n.children} sel={sel} onSel={onSel} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

function EquipmentPage() {
  const [sel, setSel] = useState<Node>(equipmentTree[0]!.children![0]!.children![0]!);
  const jobs = workOrders.filter((w) => w.equipment === sel.name);
  return (
    <Shell title="Equipment">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="p-3"><Tree nodes={equipmentTree} sel={sel} onSel={setSel} /></Card>
        <Card>
          <div className="font-mono text-xs text-primary">{sel.kind.toUpperCase()} · {sel.code}</div>
          <h2 className="mt-1 font-display text-2xl">{sel.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4"><div className="text-xs text-muted-foreground">Running hours</div><div className="mt-1 font-mono text-2xl">{sel.hours?.toLocaleString() ?? "—"}</div></div>
            <div className="rounded-lg border border-border p-4"><div className="text-xs text-muted-foreground">Sub-items</div><div className="mt-1 font-mono text-2xl">{sel.children?.length ?? 0}</div></div>
            <div className="rounded-lg border border-border p-4"><div className="text-xs text-muted-foreground">Planned jobs</div><div className="mt-1 font-mono text-2xl">{jobs.length}</div></div>
          </div>
          <h3 className="mt-8 mb-3 font-display text-lg">Maintenance plans</h3>
          {jobs.length === 0 ? <p className="text-sm text-muted-foreground">No plans attached to this item.</p> : jobs.map((j) => (
            <div key={j.id} className="flex items-center justify-between border-t border-border py-3">
              <div><div className="text-sm">{j.title}</div><div className="font-mono text-xs text-muted-foreground">Every {j.interval} · {j.due}</div></div>
              <Pill v={j.status} />
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
}
