import { cn } from "@/lib/utils";

export default function LabeledField({ label, children, className }) {
  return (
    <div className={cn("space-y-1.5 text-xs", className)}>
      <div className="flex justify-between text-sm font-medium text-foreground">
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
