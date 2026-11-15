import { useState } from "react";

export type Field = { name: string; label: string; type?: "text" | "number" | "select"; options?: string[] };

type FormValues = Record<string, string>;

export function AddForm({
  title,
  fields,
  onAdd,
  validate,
}: {
  title: string;
  fields: Field[];
  onAdd: (values: FormValues) => void | Promise<void>;
  validate?: (values: FormValues) => string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.options?.[0] ?? ""]));
  const [v, setV] = useState<FormValues>(blank);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
        + {title}
      </button>
    );

  return (
    <form
      className="mb-4 w-full rounded-xl border border-primary/40 bg-card p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const values: FormValues = Object.fromEntries(Object.entries(v).map(([name, value]) => [name, value.trim()]));
        if (fields.some((field) => !values[field.name])) {
          setError("Complete all fields before saving.");
          return;
        }
        const validationError = validate?.(values);
        if (validationError) {
          setError(validationError);
          return;
        }

        setError("");
        setSubmitting(true);
        try {
          await onAdd(values);
          setV(blank());
          setOpen(false);
        } catch (submitError) {
          const message = submitError instanceof Error ? submitError.message.trim() : "";
          setError(message || "Unable to save. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <h3 className="mb-4 font-display text-lg">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <label key={f.name} className="text-xs text-muted-foreground">
            {f.label}
            {f.type === "select" ? (
              <select required value={v[f.name]} onChange={(e) => { setV({ ...v, [f.name]: e.target.value }); setError(""); }}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                {(f.options ?? []).map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type ?? "text"}
                value={v[f.name]}
                min={f.type === "number" ? 0 : undefined}
                step={f.type === "number" ? 1 : undefined}
                onChange={(e) => { setV({ ...v, [f.name]: e.target.value }); setError(""); }}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" />
            )}
          </label>
        ))}
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={submitting} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
          {submitting ? "Saving..." : "Save"}
        </button>
        <button type="button" disabled={submitting} onClick={() => setOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-50">Cancel</button>
      </div>
    </form>
  );
}
