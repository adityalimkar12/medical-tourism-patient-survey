import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Treatment" },
  { id: 3, label: "Challenges" },
  { id: 4, label: "Follow-up" },
];

export function ProgressSteps({ current }: { current: number }) {
  const pct = ((current - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="w-full">
      <div className="relative mb-3">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s) => {
            const done = s.id < current;
            const active = s.id === current;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                    done && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-background text-primary ring-4 ring-primary/15",
                    !done && !active && "border-border bg-background text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    active || done ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
