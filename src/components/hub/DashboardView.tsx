import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  Gauge,
  MessagesSquare,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsibleAICard } from "./ResponsibleAICard";
import type { ViewKey } from "./AppSidebar";
import type { HubStats } from "./types";

const FEATURES = [
  {
    key: "planner" as ViewKey,
    icon: CalendarClock,
    title: "AI Task Planner",
    description:
      "Turn a messy backlog into a prioritised, time-boxed schedule with realistic estimates.",
  },
  {
    key: "research" as ViewKey,
    icon: BookOpenCheck,
    title: "AI Research Assistant",
    description:
      "Summarise articles, surface key insights and get actionable next steps in seconds.",
  },
  {
    key: "chat" as ViewKey,
    icon: MessagesSquare,
    title: "AI Chatbot",
    description: "Ask workplace questions, prepare for meetings and unblock your day instantly.",
  },
];

export function DashboardView({
  stats,
  onNavigate,
}: {
  stats: HubStats;
  onNavigate: (key: ViewKey) => void;
}) {
  const summary = [
    { label: "Tasks Planned", value: stats.tasksPlanned, icon: CalendarClock, hint: "this week" },
    {
      label: "Research Sessions",
      value: stats.researchSessions,
      icon: BookOpenCheck,
      hint: "documents processed",
    },
    { label: "AI Chats", value: stats.chats, icon: MessagesSquare, hint: "assistant replies" },
    {
      label: "Productivity Score",
      value: stats.productivity,
      icon: Gauge,
      hint: "vs. 71 team average",
      isScore: true,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="surface-card overflow-hidden">
        <div className="gradient-primary px-6 py-8 md:px-9 md:py-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium text-primary-foreground">
            <Sparkles className="size-3.5" aria-hidden />
            Three AI tools, one workspace
          </span>
          <h1 className="mt-4 max-w-2xl text-2xl font-bold text-primary-foreground md:text-3xl">
            Good day, Que Jr. Your workday is planned and ready.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/85">
            Plan tasks, research faster and get answers without switching between five different
            applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2" onClick={() => onNavigate("planner")}>
              Plan my day
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              onClick={() => onNavigate("chat")}
            >
              Ask the assistant
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Workspace summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="surface-card hover-lift p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-display text-3xl font-bold">
                  {item.value}
                  {item.isScore ? <span className="text-lg text-muted-foreground">/100</span> : null}
                </p>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <item.icon className="size-5" aria-hidden />
              </span>
            </div>
            <Progress
              value={item.isScore ? item.value : Math.min(100, item.value * 8 + 12)}
              className="mt-4 h-2"
            />
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="size-3.5 text-success" aria-hidden />
              {item.hint}
            </p>
          </article>
        ))}
      </section>

      <section aria-label="AI tools" className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article key={feature.key} className="surface-card hover-lift flex flex-col p-6">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <feature.icon className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
            <Button className="mt-5 w-full gap-2" onClick={() => onNavigate(feature.key)}>
              Open Tool
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </article>
        ))}
      </section>

      <ResponsibleAICard />
    </div>
  );
}
