import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({ title, description, eyebrow, children, className }: CardProps) {
  return (
    <section className={cn("rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", className)}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p> : null}
      {title ? <h2 className="mt-2 text-xl font-semibold text-slate-900">{title}</h2> : null}
      {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
