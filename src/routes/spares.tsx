import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Pill } from "@/components/Shell";
import { AddForm } from "@/components/AddForm";
import { spares as seed } from "@/lib/pms-data";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/spares")({
  head: () => ({
    meta: [
      { title: "Spare Parts — Bridgeline Marine PMS" },
      { name: "description", content: "Onboard spare parts inventory with minimum stock alerts." },
      { property: "og:title", content: "Spare Parts — Bridgeline Marine PMS" },
      { property: "og:description", content: "Onboard spare parts inventory with minimum stock alerts." },
    ],
  }),
  component: SparesPage,
});

function SparesPage() {
  const [list, setList] = useDemo("spares", seed);
  const adjust = (no: string, d: number) => setList(list.map((s) => (s.no === no ? { ...s, onHand: Math.max(0, s.onHand + d) } : s)));
  return (
    <Shell title="Spare Parts">
      <div className="mb-4 flex justify-end">
        <AddForm
          title="Add spare part"
          fields={[
            { name: "part", label: "Part name" },
            { name: "no", label: "Part number" },
            { name: "onHand", label: "On hand", type: "number" },
            { name: "min", label: "Minimum stock", type: "number" },
            { name: "location", label: "Location" },
          ]}
          validate={(values) =>
            list.some((spare) => spare.no.trim().toLowerCase() === values.no.toLowerCase())
              ? "A spare part with this part number already exists."
              : undefined
          }
          onAdd={(v) => setList([{ part: v.part, no: v.no, onHand: Number(v.onHand), min: Number(v.min), location: v.location }, ...list])}
        />
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr className="border-b border-border">{["Part", "Part no.", "On hand", "Min", "Location", "Stock", ""].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.no} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{s.part}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.no}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono">
                  <button onClick={() => adjust(s.no, -1)} className="mr-2 rounded border border-border px-1.5">−</button>
                  {s.onHand}
                  <button onClick={() => adjust(s.no, 1)} className="ml-2 rounded border border-border px-1.5">+</button>
                </td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{s.min}</td>
                <td className="px-4 py-3">{s.location}</td>
                <td className="px-4 py-3"><Pill v={s.onHand === 0 ? "overdue" : s.onHand < s.min ? "due" : "ok"} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setList(list.filter((x) => x.no !== s.no))} className="text-xs text-muted-foreground hover:text-destructive">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}
