import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="gradient-primary flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-soft">
        <Icon className="size-6 text-primary-foreground" aria-hidden />
      </span>
      <div>
        <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
