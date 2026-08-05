import { ShieldCheck } from "lucide-react";

export function ResponsibleAICard() {
  return (
    <section
      aria-labelledby="responsible-ai-heading"
      id="responsible-ai"
      className="surface-card scroll-mt-24 p-5 md:p-6"
    >
      <div className="flex gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <ShieldCheck className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h2 id="responsible-ai-heading" className="text-base font-semibold">
            Responsible AI Notice
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This application provides AI-generated suggestions intended to assist users with
            workplace productivity. Users should review all AI-generated content before making
            business decisions. Sensitive, confidential, or personal information should not be
            shared with the AI.
          </p>
        </div>
      </div>
    </section>
  );
}
