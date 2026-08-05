import { Check, Monitor, Moon, Settings2, Sun } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ACCENTS, useTheme, type ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { PageHeader } from "./PageHeader";
import { ResponsibleAICard } from "./ResponsibleAICard";

const MODES: { key: ThemeMode; label: string; icon: typeof Sun; hint: string }[] = [
  { key: "light", label: "Light", icon: Sun, hint: "Bright, high-contrast interface" },
  { key: "dark", label: "Dark", icon: Moon, hint: "Easier on the eyes at night" },
  { key: "system", label: "System Default", icon: Monitor, hint: "Follows your device setting" },
];

export function SettingsView() {
  const { mode, accent, setMode, setAccent } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Settings2}
        title="Settings"
        description="Personalise the workspace. Your preferences are saved on this device."
      />

      <section aria-labelledby="appearance-heading" className="surface-card p-6">
        <h2 id="appearance-heading" className="text-lg font-semibold">
          Appearance
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a theme mode and accent colour. Changes preview instantly.
        </p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold">Theme mode</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {MODES.map((option) => {
              const selected = mode === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setMode(option.key);
                    toast.success(`${option.label} mode applied`);
                  }}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    selected ? "border-primary bg-accent/60" : "bg-card",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <option.icon className="size-5 text-primary" aria-hidden />
                    {selected ? <Check className="size-4 text-primary" aria-hidden /> : null}
                  </div>
                  <p className="mt-3 font-medium">{option.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{option.hint}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold">Colour theme</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ACCENTS.map((option) => {
              const selected = accent === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setAccent(option.key);
                    toast.success(`${option.name} theme applied`);
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    selected ? "border-primary bg-accent/60" : "bg-card",
                  )}
                >
                  <span
                    className="mt-0.5 size-8 shrink-0 rounded-full border shadow-soft"
                    style={{ backgroundColor: option.swatch }}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-medium">
                      {option.name}
                      {selected ? <Check className="size-4 text-primary" aria-hidden /> : null}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="prefs-heading" className="surface-card space-y-4 p-6">
        <h2 id="prefs-heading" className="text-lg font-semibold">
          Workspace preferences
        </h2>
        {[
          { id: "pref-notify", label: "Task reminders", hint: "Notify me before a task is due." },
          {
            id: "pref-digest",
            label: "Weekly productivity digest",
            hint: "A Monday summary of last week's output.",
          },
          {
            id: "pref-redact",
            label: "Confidential content warning",
            hint: "Warn me before sending sensitive text to the AI.",
          },
        ].map((pref, index) => (
          <div key={pref.id} className="flex items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <Label htmlFor={pref.id} className="font-medium">
                {pref.label}
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">{pref.hint}</p>
            </div>
            <Switch id={pref.id} defaultChecked={index !== 1} />
          </div>
        ))}
      </section>

      <ResponsibleAICard />
    </div>
  );
}
