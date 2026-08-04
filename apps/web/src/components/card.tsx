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
    <section className={cn("rounded-[1.75rem] border border-white/80 bg-white/85 p-8 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.38)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-20px_rgba(15,23,42,0.4)]", className)}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p> : null}
      {title ? <h2 className="mt-2 text-xl font-semibold text-slate-900">{title}</h2> : null}
      {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
