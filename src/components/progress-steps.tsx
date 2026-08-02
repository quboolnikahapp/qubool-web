import { cn } from "@/lib/utils/cn";

type ProgressStepsProps = {
  steps: string[];
  currentStep: number;
};

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                isActive && "border-emerald-700 bg-emerald-700 text-white",
                isComplete && "border-emerald-600 bg-emerald-50 text-emerald-700",
                !isActive && !isComplete && "border-slate-300 bg-white text-slate-500",
              )}
            >
              {index + 1}
            </div>
            <span className={cn("text-sm", isActive ? "font-semibold text-slate-900" : "text-slate-500")}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
