import { useEffect, useRef, useState } from "react";
import { Bot, Eraser, Loader2, MessagesSquare, Send, User, UserCog } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatWithAssistant } from "@/lib/ai-service";
import { cn } from "@/lib/utils";
import { PageHeader } from "./PageHeader";
import {
  CHAT_PROFILE_KEY,
  ChatProfileDialog,
  loadChatProfile,
  type ChatProfile,
} from "./ChatProfileDialog";


type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const EXAMPLES = [
  "Plan my workday",
  "Explain Agile methodology",
  "Summarize this project",
  "Improve my productivity",
  "Help prepare for a meeting",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    if (!line.trim()) return <span key={index} className="block h-2" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={index} className="text-sm leading-relaxed">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </p>
    );
  });
}

export function ChatbotView({ onMessage }: { onMessage: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ChatProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadChatProfile();
    setProfile(stored);
    setHydrated(true);
    if (!stored) setProfileOpen(true);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveProfile(next: ChatProfile) {
    setProfile(next);
    try {
      window.localStorage.setItem(CHAT_PROFILE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage errors */
    }
    setProfileOpen(false);
    toast.success(`Profile saved — responses personalized for ${next.fullName.split(" ")[0]}.`);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    if (!profile) {
      setProfileOpen(true);
      toast.info("Please complete your profile before starting the conversation.");
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      time: now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await chatWithAssistant(trimmed, profile);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply, time: now() },
      ]);
      onMessage();
    } catch {
      toast.error("The assistant could not respond. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <ChatProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        profile={profile}
        onSave={saveProfile}
        dismissible={Boolean(profile)}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          icon={MessagesSquare}
          title="AI Workplace Chatbot"
          description={
            profile
              ? `Personalized for ${profile.fullName} · ${profile.jobTitle} · ${profile.responseStyle} responses.`
              : "Ask anything about your work — planning, processes, writing or preparation."
          }
        />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setProfileOpen(true)}>
            <UserCog className="size-4" aria-hidden />
            Update Profile
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setMessages([]);
              toast.success("Conversation cleared");
            }}
            disabled={messages.length === 0}
          >
            <Eraser className="size-4" aria-hidden />
            Clear conversation
          </Button>
        </div>
      </div>

      <section className="surface-card flex h-[calc(100vh-19rem)] min-h-[26rem] flex-col overflow-hidden">
        <div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6">
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="gradient-primary flex size-14 items-center justify-center rounded-2xl shadow-soft">
                <Bot className="size-7 text-primary-foreground" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold">
                {profile ? `How can I help you today, ${profile.fullName.split(" ")[0]}?` : "Let's set up your profile"}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {hydrated && !profile
                  ? "Complete the short onboarding form so the assistant can tailor answers to your role."
                  : "Start with one of these prompts or type your own question."}
              </p>
              {hydrated && !profile ? (
                <Button className="mt-5" onClick={() => setProfileOpen(true)}>
                  Complete onboarding
                </Button>
              ) : null}
              <div className="mt-5 flex flex-wrap justify-center gap-2">

                {EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => send(example)}
                    className="rounded-full border bg-muted/50 px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-fade-in gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" ? (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Bot className="size-4" aria-hidden />
                </span>
              ) : null}
              <div className={cn("max-w-[85%] md:max-w-[70%]")}>
                <div
                  className={cn(
                    "space-y-1 rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border bg-muted/40 text-foreground",
                  )}
                >
                  {renderContent(message.content)}
                </div>
                <p
                  className={cn(
                    "mt-1 text-[11px] text-muted-foreground",
                    message.role === "user" ? "text-right" : "text-left",
                  )}
                >
                  {message.time}
                </p>
              </div>
              {message.role === "user" ? (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <User className="size-4" aria-hidden />
                </span>
              ) : null}
            </div>
          ))}

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Bot className="size-4" aria-hidden />
              </span>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          className="flex items-end gap-3 border-t bg-background/60 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Message the assistant
          </label>
          <Textarea
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            disabled={!profile}
            placeholder={
              profile
                ? "Ask about planning, processes or preparation…"
                : "Complete your profile to start chatting…"
            }
            className="max-h-40 min-h-11 flex-1 resize-none rounded-xl"
          />
          <Button
            type="submit"
            size="icon"
            className="size-11 rounded-xl"
            disabled={loading || !profile}
            aria-label="Send message"
          >
            <Send className="size-4" aria-hidden />
          </Button>

        </form>
      </section>
    </div>
  );
}
