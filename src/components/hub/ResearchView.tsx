import { useState } from "react";
import {
  BookOpenCheck,
  FileText,
  HelpCircle,
  Lightbulb,
  Loader2,
  ListChecks,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { runResearch, type ResearchResult } from "@/lib/ai-service";
import { PageHeader } from "./PageHeader";

type Mode = "summarize" | "insights" | "next-steps";

export function ResearchView({ onCompleted }: { onCompleted: () => void }) {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState<Mode | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);

  async function run(mode: Mode) {
    if (!topic.trim()) {
      toast.error("Enter a research topic to get started.");
      return;
    }
    setLoading(mode);
    try {
      const research = await runResearch(topic, mode, article);
      setResult(research);
      onCompleted();
      toast.success("Research complete");
    } catch {
      toast.error("The research assistant is unavailable. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const busy = loading !== null;

  const cards = result
    ? [
        {
          title: "Summary",
          icon: FileText,
          body: <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p>,
        },
        {
          title: "Key Insights",
          icon: Lightbulb,
          body: <BulletList items={result.insights} />,
        },
        {
          title: "Recommendations",
          icon: ListChecks,
          body: <BulletList items={result.recommendations} />,
        },
        {
          title: "Related Questions",
          icon: HelpCircle,
          body: <BulletList items={result.questions} />,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BookOpenCheck}
        title="AI Research Assistant"
        description="Summarise sources, extract insights and turn reading into decisions."
      />

      <section className="surface-card space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="research-topic">Research topic</Label>
          <Input
            id="research-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Adopting AI assistants in customer operations"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="research-article">Article or text (optional)</Label>
          <Textarea
            id="research-article"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Paste an article, meeting notes or a report extract…"
            rows={6}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => run("summarize")} disabled={busy} className="gap-2">
            {loading === "summarize" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <FileText className="size-4" aria-hidden />
            )}
            Summarize
          </Button>
          <Button
            variant="secondary"
            onClick={() => run("insights")}
            disabled={busy}
            className="gap-2"
          >
            {loading === "insights" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Lightbulb className="size-4" aria-hidden />
            )}
            Generate Insights
          </Button>
          <Button
            variant="outline"
            onClick={() => run("next-steps")}
            disabled={busy}
            className="gap-2"
          >
            {loading === "next-steps" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <ListChecks className="size-4" aria-hidden />
            )}
            Recommend Next Steps
          </Button>
        </div>
      </section>

      {busy ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="surface-card space-y-3 p-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : !result ? (
        <div className="surface-card flex flex-col items-center justify-center p-12 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Search className="size-7" aria-hidden />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Nothing researched yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add a topic and choose an action. Summaries, insights, recommendations and follow-up
            questions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid animate-fade-in gap-4 lg:grid-cols-2">
          {cards.map((card) => (
            <section key={card.title} className="surface-card hover-lift p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <card.icon className="size-5 text-primary" aria-hidden />
                {card.title}
              </h2>
              <div className="mt-3">{card.body}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
