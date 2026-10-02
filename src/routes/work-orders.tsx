import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, Card, Pill } from "@/components/Shell";
import { AddForm } from "@/components/AddForm";
import { workOrders as seed, type Status } from "@/lib/pms-data";
import { useDemo } from "@/lib/demo-store";

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
  const [list, setList] = useDemo("workOrders", seed);
  const rows = list.filter((w) => f === "all" || w.status === f);
  return (
    <Shell title="Work Orders">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)}
              className={`rounded-full border px-3 py-1 font-mono text-xs uppercase ${f === x ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{x}</button>
          ))}
        </div>
        <AddForm
          title="New work order"
          fields={[
            { name: "title", label: "Job title" },
            { name: "equipment", label: "Equipment" },
            { name: "interval", label: "Interval (e.g. 500 h)" },
            { name: "due", label: "Due (e.g. In 5 days)" },
            { name: "assignee", label: "Assignee" },
            { name: "status", label: "Status", type: "select", options: ["ok", "due", "overdue"] },
            { name: "critical", label: "Critical", type: "select", options: ["No", "Yes"] },
          ]}
          onAdd={(v) =>
            setList([
              { id: `WO-24-${String(200 + list.length).padStart(4, "0")}`, title: v.title!, equipment: v.equipment!, interval: v.interval!, due: v.due!, assignee: v.assignee!, status: v.status as Status, critical: v.critical === "Yes" },
              ...list,
            ])
          }
        />
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
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {w.status !== "done" && (
                    <button onClick={() => setList(list.map((x) => (x.id === w.id ? { ...x, status: "done" as Status, due: "Completed today" } : x)))}
                      className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:opacity-90">Complete</button>
                  )}
                  <button onClick={() => setList(list.filter((x) => x.id !== w.id))} className="ml-2 text-xs text-muted-foreground hover:text-destructive">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}
