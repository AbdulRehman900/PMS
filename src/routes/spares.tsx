import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Pill } from "@/components/Shell";
import { spares } from "@/lib/pms-data";

export const Route = createFileRoute("/spares")({
  head: () => ({
    meta: [
      { title: "Spare Parts — Bridgeline Marine PMS" },
      { name: "description", content: "Onboard spare parts inventory with minimum stock alerts." },
      { property: "og:title", content: "Spare Parts — Bridgeline Marine PMS" },
      { property: "og:description", content: "Onboard spare parts inventory with minimum stock alerts." },
    ],
  }),
  component: () => (
    <Shell title="Spare Parts">
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr className="border-b border-border">{["Part", "Part no.", "On hand", "Min", "Location", "Stock"].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {spares.map((s) => (
              <tr key={s.no} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{s.part}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.no}</td>
                <td className="px-4 py-3 font-mono">{s.onHand}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{s.min}</td>
                <td className="px-4 py-3">{s.location}</td>
                <td className="px-4 py-3"><Pill v={s.onHand === 0 ? "overdue" : s.onHand < s.min ? "due" : "ok"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  ),
});
