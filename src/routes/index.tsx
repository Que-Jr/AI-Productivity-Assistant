import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppSidebar, type ViewKey } from "@/components/hub/AppSidebar";
import { TopBar } from "@/components/hub/TopBar";
import { DashboardView } from "@/components/hub/DashboardView";
import { TaskPlannerView } from "@/components/hub/TaskPlannerView";
import { ResearchView } from "@/components/hub/ResearchView";
import { ChatbotView } from "@/components/hub/ChatbotView";
import { SettingsView } from "@/components/hub/SettingsView";
import { AppFooter } from "@/components/hub/AppFooter";
import type { HubStats } from "@/components/hub/types";

const title = "AI Workplace Productivity Hub — Plan, Research & Chat";
const description =
  "An AI productivity dashboard combining a smart task planner, research assistant and workplace chatbot in one professional workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [stats, setStats] = useState<HubStats>({
    tasksPlanned: 12,
    researchSessions: 7,
    chats: 24,
    productivity: 82,
  });

  const bump = (key: keyof HubStats, amount = 1) =>
    setStats((prev) => ({
      ...prev,
      [key]: prev[key] + amount,
      productivity: Math.min(100, prev.productivity + 1),
    }));

  const navigate = (next: ViewKey) => {
    setView(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r lg:block">
          <AppSidebar
            active={view}
            onNavigate={navigate}
            onLogout={() => toast.success("You have been logged out of the demo session.")}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            active={view}
            onNavigate={navigate}
            onLogout={() => toast.success("You have been logged out of the demo session.")}
          />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-7xl">
              {view === "dashboard" && <DashboardView stats={stats} onNavigate={navigate} />}
              {view === "planner" && <TaskPlannerView onPlanned={() => bump("tasksPlanned")} />}
              {view === "research" && (
                <ResearchView onCompleted={() => bump("researchSessions")} />
              )}
              {view === "chat" && <ChatbotView onMessage={() => bump("chats")} />}
              {view === "settings" && <SettingsView />}
              <AppFooter />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
