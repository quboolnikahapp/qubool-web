import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "slate" | "emerald" | "amber";
  className?: string;
};

export function Badge({ children, tone = "slate", className }: BadgeProps) {
  const toneClasses = {
    slate: "bg-slate-900/5 text-slate-700",
    emerald: "bg-emerald-100/80 text-emerald-800",
    amber: "bg-amber-100/80 text-amber-800",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-medium", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
