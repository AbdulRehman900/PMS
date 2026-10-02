import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { vessels } from "@/lib/pms-data";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/equipment", label: "Equipment" },
  { to: "/work-orders", label: "Work Orders" },
  { to: "/defects", label: "Defects" },
  { to: "/spares", label: "Spare Parts" },
] as const;

export function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar p-5 md:flex">
        <div className="mb-8">
          <div className="font-mono text-xs tracking-[0.3em] text-primary">PMS · MARINE</div>
          <div className="mt-1 font-display text-xl">Bridgeline</div>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-sidebar-accent hover:text-foreground"
              activeProps={{ className: "bg-sidebar-accent text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-border p-3 text-xs">
          <div className="text-muted-foreground">Active vessel</div>
          <div className="mt-1 font-medium">{vessels[0]?.name}</div>
          <div className="font-mono text-muted-foreground">IMO {vessels[0]?.imo}</div>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <h1 className="font-display text-2xl">{title}</h1>
          <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">Demo data</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

const tone: Record<string, string> = {
  overdue: "bg-destructive/15 text-destructive",
  High: "bg-destructive/15 text-destructive",
  due: "bg-warning/15 text-warning",
  Medium: "bg-warning/15 text-warning",
  ok: "bg-primary/15 text-primary",
  Low: "bg-primary/15 text-primary",
  done: "bg-success/15 text-success",
};

export function Pill({ v }: { v: string }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs uppercase ${tone[v] ?? "bg-muted text-muted-foreground"}`}>{v}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}
