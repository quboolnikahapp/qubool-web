import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  loading?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all",
    secondary: "border-2 border-emerald-700 text-emerald-700 bg-transparent hover:bg-emerald-50",
    ghost: "text-emerald-700 hover:bg-emerald-50",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70",
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
