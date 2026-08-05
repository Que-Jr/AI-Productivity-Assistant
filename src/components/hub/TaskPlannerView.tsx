import { useState } from "react";
import { CalendarClock, Clock, Loader2, ListChecks, Lightbulb, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSchedule, type Priority, type SchedulePlan } from "@/lib/ai-service";
import { cn } from "@/lib/utils";
import { PageHeader } from "./PageHeader";

const priorityStyles: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/15 text-warning-foreground border-warning/30",
  Low: "bg-success/10 text-success border-success/20",
};

export function TaskPlannerView({ onPlanned }: { onPlanned: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("High");
  const [dueDate, setDueDate] = useState("");
  const [hours, setHours] = useState("8");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SchedulePlan | null>(null);

  async function handleGenerate(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Add a task name so the planner has something to schedule.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateSchedule({
        name,
        description,
        priority,
        dueDate,
        workingHours: Number(hours),
      });
      setPlan(result);
      onPlanned();
      toast.success("Smart schedule generated");
    } catch {
      toast.error("The planner could not generate a schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={CalendarClock}
        title="AI Task Planner & Scheduler"
        description="Describe the work and let the assistant build a prioritised, time-boxed plan."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <form onSubmit={handleGenerate} className="surface-card h-fit space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task name</Label>
            <Input
              id="task-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Prepare Q3 operations review"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does done look like? Any dependencies?"
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger id="task-priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-due">Due date</Label>
              <Input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-hours">Working hours available</Label>
            <Input
              id="task-hours"
              type="number"
              min={1}
              max={12}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Sparkles className="size-4" aria-hidden />
            )}
            {loading ? "Generating…" : "Generate Smart Schedule"}
          </Button>
        </form>

        <div className="space-y-4">
          {loading ? (
            <div className="surface-card space-y-4 p-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : !plan ? (
            <div className="surface-card flex flex-col items-center justify-center p-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <ListChecks className="size-7" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold">No schedule yet</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Fill in the task details and generate a smart schedule. Your prioritised plan,
                estimates and recommendations will appear here.
              </p>
            </div>
          ) : (
            <div className="animate-fade-in space-y-4">
              <section className="surface-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Prioritised task list</h2>
                  <Badge variant="secondary">{plan.totalEstimate}</Badge>
                </div>
                <ul className="mt-4 space-y-3">
                  {plan.tasks.map((task) => (
                    <li key={task.title} className="rounded-xl border bg-muted/40 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="font-medium">{task.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn("border", priorityStyles[task.priority])}
                          >
                            {task.priority}
                          </Badge>
                          <Badge variant="secondary">{task.status}</Badge>
                        </div>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" aria-hidden />
                        {task.estimate}
                      </p>
                      <Progress value={task.progress} className="mt-3 h-1.5" />
                    </li>
                  ))}
                </ul>
              </section>

              <div className="grid gap-4 xl:grid-cols-2">
                <section className="surface-card p-6">
                  <h2 className="text-lg font-semibold">Suggested daily schedule</h2>
                  <ol className="mt-4 space-y-3">
                    {plan.schedule.map((block) => (
                      <li key={block.time} className="flex gap-4 text-sm">
                        <span className="w-14 shrink-0 font-semibold text-primary">
                          {block.time}
                        </span>
                        <span className="flex-1">{block.activity}</span>
                        <span className="text-muted-foreground">{block.duration}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 rounded-xl bg-accent/60 p-4">
                    <p className="text-sm font-medium text-accent-foreground">
                      Focus score {plan.focusScore}/100
                    </p>
                    <Progress value={plan.focusScore} className="mt-2 h-2" />
                  </div>
                </section>

                <section className="surface-card p-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Lightbulb className="size-5 text-primary" aria-hidden />
                    Productivity recommendations
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {plan.recommendations.map((rec) => (
                      <li key={rec} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
