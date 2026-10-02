import { useState } from "react";

export type Field = { name: string; label: string; type?: "text" | "number" | "select"; options?: string[] };

export function AddForm({ title, fields, onAdd }: { title: string; fields: Field[]; onAdd: (v: any) => void }) {
  const [open, setOpen] = useState(false);
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.options?.[0] ?? ""]));
  const [v, setV] = useState<Record<string, string>>(blank);

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
        + {title}
      </button>
    );

  return (
    <form
      className="mb-4 w-full rounded-xl border border-primary/40 bg-card p-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (fields.some((f) => !v[f.name]?.trim())) return;
        onAdd(v);
        setV(blank());
        setOpen(false);
      }}
    >
      <h3 className="mb-4 font-display text-lg">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <label key={f.name} className="text-xs text-muted-foreground">
            {f.label}
            {f.type === "select" ? (
              <select value={v[f.name]} onChange={(e) => setV({ ...v, [f.name]: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                {f.options!.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type ?? "text"} value={v[f.name]} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" />
            )}
          </label>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Save</button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
      </div>
    </form>
  );
}
