import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "slate" | "emerald" | "amber";
  className?: string;
};

export function Badge({ children, tone = "slate", className }: BadgeProps) {
  const toneClasses = {
    slate: "bg-slate-100 text-slate-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-medium", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
