import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, Card, Pill } from "@/components/Shell";
import { workOrders } from "@/lib/pms-data";

export const Route = createFileRoute("/work-orders")({
  head: () => ({
    meta: [
      { title: "Work Orders — Bridgeline Marine PMS" },
      { name: "description", content: "Track planned maintenance work orders by status and due date." },
      { property: "og:title", content: "Work Orders — Bridgeline Marine PMS" },
      { property: "og:description", content: "Track planned maintenance work orders by status and due date." },
    ],
  }),
  component: WorkOrdersPage,
});

const filters = ["all", "overdue", "due", "ok", "done"];

function WorkOrdersPage() {
  const [f, setF] = useState("all");
  const [done, setDone] = useState<string[]>([]);
  const rows = workOrders
    .map((w) => (done.includes(w.id) ? { ...w, status: "done" as const, due: "Completed today" } : w))
    .filter((w) => f === "all" || w.status === f);
  return (
    <Shell title="Work Orders">
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)}
            className={`rounded-full border px-3 py-1 font-mono text-xs uppercase ${f === x ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{x}</button>
        ))}
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr className="border-b border-border">{["No.", "Job", "Interval", "Due", "Assignee", "Status", ""].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <tr key={w.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{w.id}</td>
                <td className="px-4 py-3">{w.title}{w.critical && <span className="ml-2 font-mono text-xs text-destructive">CRITICAL</span>}</td>
                <td className="px-4 py-3 font-mono text-xs">{w.interval}</td>
                <td className="px-4 py-3 text-muted-foreground">{w.due}</td>
                <td className="px-4 py-3">{w.assignee}</td>
                <td className="px-4 py-3"><Pill v={w.status} /></td>
                <td className="px-4 py-3 text-right">
                  {w.status !== "done" && <button onClick={() => setDone([...done, w.id])} className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:opacity-90">Complete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}
