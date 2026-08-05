import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ResponseStyle = "Concise" | "Detailed" | "Step-by-step";

export type ChatProfile = {
  fullName: string;
  jobTitle: string;
  department: string;
  company: string;
  workGoal: string;
  responseStyle: ResponseStyle;
  language: string;
};

export const CHAT_PROFILE_KEY = "hub.chat.profile";

export const WORK_GOALS = [
  "Project Management",
  "Research",
  "Administration",
  "Customer Support",
  "Software Development",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Student",
  "Other",
];

export const RESPONSE_STYLES: ResponseStyle[] = ["Concise", "Detailed", "Step-by-step"];

const EMPTY: ChatProfile = {
  fullName: "",
  jobTitle: "",
  department: "",
  company: "",
  workGoal: "Project Management",
  responseStyle: "Concise",
  language: "",
};

export function loadChatProfile(): ChatProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CHAT_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatProfile;
    return parsed.fullName ? parsed : null;
  } catch {
    return null;
  }
}

export function ChatProfileDialog({
  open,
  onOpenChange,
  profile,
  onSave,
  dismissible,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ChatProfile | null;
  onSave: (profile: ChatProfile) => void;
  dismissible: boolean;
}) {
  const [form, setForm] = useState<ChatProfile>(profile ?? EMPTY);

  useEffect(() => {
    if (open) setForm(profile ?? EMPTY);
  }, [open, profile]);

  const set = <K extends keyof ChatProfile>(key: K, value: ChatProfile[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const valid = form.fullName.trim() && form.jobTitle.trim() && form.department.trim();

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !dismissible) return;
        onOpenChange(next);
      }}
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-lg"
        showCloseButton={dismissible}
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{profile ? "Update your profile" : "Welcome to the AI Chatbot"}</DialogTitle>
          <DialogDescription>
            Tell the assistant a little about you so responses match your role and preferred style.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!valid) return;
            onSave({
              ...form,
              fullName: form.fullName.trim(),
              jobTitle: form.jobTitle.trim(),
              department: form.department.trim(),
              company: form.company.trim(),
              language: form.language.trim(),
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="profile-name">Full name</Label>
              <Input
                id="profile-name"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="Que Jr Sibuyi"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-title">Job title</Label>
              <Input
                id="profile-title"
                value={form.jobTitle}
                onChange={(e) => set("jobTitle", e.target.value)}
                placeholder="Operations Lead"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-dept">Department</Label>
              <Input
                id="profile-dept"
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                placeholder="Operations"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-company">Company (optional)</Label>
              <Input
                id="profile-company"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Acme Group"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-language">Preferred language (optional)</Label>
              <Input
                id="profile-language"
                value={form.language}
                onChange={(e) => set("language", e.target.value)}
                placeholder="English"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-goal">Primary work goal</Label>
              <Select value={form.workGoal} onValueChange={(v) => set("workGoal", v)}>
                <SelectTrigger id="profile-goal">
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_GOALS.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-style">Preferred response style</Label>
              <Select
                value={form.responseStyle}
                onValueChange={(v) => set("responseStyle", v as ResponseStyle)}
              >
                <SelectTrigger id="profile-style">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {RESPONSE_STYLES.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border bg-muted/40 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              <strong className="font-semibold text-foreground">Privacy Notice:</strong> Your profile
              information is stored only in your browser to personalize AI responses. It is not shared
              or transmitted unless you connect an external AI service.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={!valid}>
            {profile ? "Save profile" : "Start Chatting"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
