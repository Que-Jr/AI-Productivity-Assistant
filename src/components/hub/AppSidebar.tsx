import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarClock,
  BookOpenCheck,
  MessagesSquare,
  Settings2,
  LogOut,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewKey = "dashboard" | "planner" | "research" | "chat" | "settings";

export const NAV_ITEMS: { key: ViewKey; label: string; icon: LucideIcon }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "planner", label: "Task Planner", icon: CalendarClock },
  { key: "research", label: "Research Assistant", icon: BookOpenCheck },
  { key: "chat", label: "AI Chatbot", icon: MessagesSquare },
  { key: "settings", label: "Settings", icon: Settings2 },
];

export function AppSidebar({
  active,
  onNavigate,
  onLogout,
}: {
  active: ViewKey;
  onNavigate: (key: ViewKey) => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="gradient-primary flex size-10 items-center justify-center rounded-xl shadow-soft">
          <Brain className="size-5 text-primary-foreground" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold">Productivity Hub</p>
          <p className="text-xs text-muted-foreground">AI Workplace Suite</p>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                isActive
                  ? "bg-accent text-accent-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-4.5 shrink-0" aria-hidden />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-3 border-t p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            AM
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">Amara Mokoena</p>
            <p className="truncate text-xs text-muted-foreground">Operations Lead</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={onLogout}>
          <LogOut className="size-4" aria-hidden />
          Log out
        </Button>
        <p className="px-1 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            v1.0.0 · Enterprise preview
          </Link>
        </p>
      </div>
    </div>
  );
}
