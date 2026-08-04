import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  rightElement?: ReactNode;
};

export function Input({ label, helperText, error, rightElement, className, ...props }: InputProps) {
  return (
    <label className="block space-y-2 text-sm text-slate-600">
      {label ? <span className="font-medium text-slate-700">{label}</span> : null}
      <div className="relative">
        <input
          className={cn(
            "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
            error && "border-rose-300 focus:border-rose-400 focus:ring-rose-100",
            rightElement ? "pr-12" : null,
            className,
          )}
          {...props}
        />
        {rightElement ? <div className="absolute inset-y-0 right-3 flex items-center">{rightElement}</div> : null}
      </div>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      {helperText && !error ? <p className="text-xs text-slate-500">{helperText}</p> : null}
    </label>
  );
}
