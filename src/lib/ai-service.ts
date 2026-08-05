/**
 * ---------------------------------------------------------------------------
 * AI SERVICE LAYER (placeholder implementations)
 * ---------------------------------------------------------------------------
 * Every function below simulates a call to an AI provider and returns
 * realistic sample content so the whole product is usable without a key.
 *
 * 👉 TO CONNECT A REAL MODEL (e.g. OpenAI):
 *    1. Add your API key as a server-side secret (never in client code).
 *    2. Create a server function that calls the model.
 *    3. Replace the body of the functions below with that call, keeping the
 *       same return types so the UI keeps working unchanged.
 *
 *    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // <-- add key here (server side)
 * ---------------------------------------------------------------------------
 */

export type Priority = "High" | "Medium" | "Low";

export type TaskInput = {
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  workingHours: number;
};

export type ScheduleBlock = {
  time: string;
  activity: string;
  duration: string;
};

export type PlannedTask = {
  title: string;
  priority: Priority;
  estimate: string;
  status: "Scheduled" | "In Progress" | "Blocked";
  progress: number;
};

export type SchedulePlan = {
  tasks: PlannedTask[];
  schedule: ScheduleBlock[];
  totalEstimate: string;
  focusScore: number;
  recommendations: string[];
};

export type ResearchResult = {
  summary: string;
  insights: string[];
  recommendations: string[];
  questions: string[];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateSchedule(input: TaskInput): Promise<SchedulePlan> {
  await delay(1400);

  const hours = Math.max(1, Math.min(12, input.workingHours || 8));
  const core = input.name.trim() || "Untitled task";
  const deep = Math.max(1, Math.round(hours * 0.45));
  const support = Math.max(1, Math.round(hours * 0.25));

  return {
    totalEstimate: `${deep + support + 1}h across ${hours}h of available capacity`,
    focusScore: input.priority === "High" ? 92 : input.priority === "Medium" ? 78 : 64,
    tasks: [
      {
        title: core,
        priority: input.priority,
        estimate: `${deep}h focused work`,
        status: "Scheduled",
        progress: 0,
      },
      {
        title: `Draft outline & success criteria for "${core}"`,
        priority: "High",
        estimate: "45m",
        status: "In Progress",
        progress: 35,
      },
      {
        title: `Stakeholder review of ${core}`,
        priority: input.priority === "High" ? "Medium" : "Low",
        estimate: `${support}h`,
        status: "Scheduled",
        progress: 0,
      },
      {
        title: "Buffer for unplanned requests",
        priority: "Low",
        estimate: "30m",
        status: "Blocked",
        progress: 0,
      },
    ],
    schedule: [
      { time: "09:00", activity: `Deep work — ${core}`, duration: `${deep}h` },
      { time: "11:00", activity: "Inbox, messages & quick approvals", duration: "30m" },
      { time: "11:30", activity: `Draft outline and define done for "${core}"`, duration: "45m" },
      { time: "13:30", activity: `Collaboration block — ${core} review`, duration: `${support}h` },
      { time: "15:30", activity: "Documentation & handover notes", duration: "45m" },
      { time: "16:30", activity: "Wrap-up, plan tomorrow, log progress", duration: "30m" },
    ],
    recommendations: [
      `Protect the morning block — "${core}" is ${input.priority.toLowerCase()} priority and benefits most from uninterrupted focus.`,
      `Target completion at least one day before ${input.dueDate || "the due date"} to leave room for review cycles.`,
      "Batch messages into two windows instead of responding continuously.",
      "Close the day with a 10-minute review so tomorrow's plan starts warm.",
    ],
  };
}

export async function runResearch(
  topic: string,
  mode: "summarize" | "insights" | "next-steps",
  article?: string,
): Promise<ResearchResult> {
  await delay(1500);

  const subject = topic.trim() || "the selected topic";
  const hasSource = Boolean(article && article.trim().length > 40);

  const summaries: Record<typeof mode, string> = {
    summarize: `${subject} is best understood as a system of trade-offs rather than a single decision. ${
      hasSource
        ? "Based on the supplied text, the core argument centres on measurable outcomes and the operational cost of achieving them."
        : "Across mainstream sources, the consensus is that early clarity on scope and ownership predicts most of the outcome."
    } The practical takeaway is to define success narrowly, instrument it, and iterate on evidence rather than opinion.`,
    insights: `Analysis of ${subject} highlights where effort actually converts into results, and where teams typically over-invest.`,
    "next-steps": `A pragmatic 30-day path for ${subject}, sequenced so each step de-risks the next.`,
  };

  return {
    summary: summaries[mode],
    insights: [
      `Adoption of ${subject} usually stalls on process, not technology.`,
      "Teams that document decisions cut rework by roughly a third.",
      hasSource
        ? "The provided source emphasises measurement — pair every initiative with one leading indicator."
        : "Public benchmarks vary widely; treat them as direction, not targets.",
      "Small, reversible pilots outperform large upfront commitments.",
    ],
    recommendations: [
      `Run a two-week pilot of ${subject} with one team and a single success metric.`,
      "Assign a named owner and a weekly 20-minute review cadence.",
      "Write a one-page decision log before expanding scope.",
      "Schedule a retrospective at day 30 and decide: scale, adjust, or stop.",
    ],
    questions: [
      `What would make ${subject} clearly not worth pursuing?`,
      "Which metric would change first if this is working?",
      "Who is accountable for the outcome, not just the activity?",
      "What is the cheapest way to test the riskiest assumption?",
    ],
  };
}

export type AssistantProfile = {
  fullName: string;
  jobTitle: string;
  department: string;
  company?: string;
  workGoal: string;
  responseStyle: "Concise" | "Detailed" | "Step-by-step";
  language?: string;
};

function personalize(body: string, profile?: AssistantProfile | null): string {
  if (!profile) return body;
  const firstName = profile.fullName.trim().split(/\s+/)[0] || profile.fullName;
  const context = `Tailored for your work in **${profile.workGoal}** as ${profile.jobTitle}${
    profile.department ? ` (${profile.department})` : ""
  }${profile.company ? ` at ${profile.company}` : ""}.`;

  if (profile.responseStyle === "Concise") {
    const lines = body.split("\n").filter(Boolean).slice(0, 6).join("\n");
    return `${firstName}, here's the short version:\n\n${lines}\n\n${context}`;
  }
  if (profile.responseStyle === "Step-by-step") {
    const steps = body
      .split("\n")
      .filter((line) => line.trim())
      .map((line, index) => `**Step ${index + 1}.** ${line.replace(/^[-*\d.]+\s*/, "")}`)
      .join("\n");
    return `${firstName}, follow these steps:\n\n${steps}\n\n${context}`;
  }
  return `Hi ${firstName} — here's a detailed view:\n\n${body}\n\n${context}${
    profile.language ? `\n\n_Preferred language noted: ${profile.language}._` : ""
  }`;
}

export async function chatWithAssistant(
  message: string,
  profile?: AssistantProfile | null,
): Promise<string> {
  await delay(1100);
  const text = message.toLowerCase();

  let body: string;
  if (text.includes("workday") || text.includes("plan my")) {
    body = `Here's a balanced plan for your day:\n\n**09:00 – 11:00 · Deep work** — your highest-priority deliverable, notifications off.\n**11:00 – 11:30 · Comms** — inbox and approvals in one batch.\n**11:30 – 13:00 · Collaboration** — reviews, pairing, unblocking others.\n**14:00 – 15:30 · Second focus block** — follow-through on the morning's work.\n**15:30 – 16:30 · Admin & documentation.**\n**16:30 – 17:00 · Wrap-up** — log progress and set tomorrow's top three.`;
  } else if (text.includes("agile")) {
    body = `**Agile** is an iterative approach to delivering work in small, reviewable increments.\n\n- **Short cycles** (1–2 week sprints) so feedback arrives early.\n- **Cross-functional teams** that own an outcome end to end.\n- **Working output over documentation** — demonstrate, then refine.\n- **Regular retrospectives** to improve the process itself.`;
  } else if (text.includes("summar")) {
    body = `Here's a structured summary:\n\n**Objective** — what the project is trying to achieve.\n**Status** — on track, with two dependencies pending.\n**Risks** — unclear ownership on integration; timeline is tight around review cycles.\n**Next steps** — confirm owners, lock scope, book the review.`;
  } else if (text.includes("productiv")) {
    body = `Four changes with the largest effect:\n\n1. **Protect one 90-minute focus block** each morning before meetings.\n2. **Limit work in progress** to three active tasks.\n3. **Batch communication** into two fixed windows.\n4. **Close the loop daily** — a 10-minute review beats a weekly catch-up.`;
  } else if (text.includes("meeting")) {
    body = `To prepare effectively:\n\n- **Purpose** — write the decision the meeting must produce.\n- **Pre-read** — send context 24 hours ahead so time is spent deciding.\n- **Agenda** — three items maximum, each with a time box.\n- **Roles** — facilitator, note-taker, decision owner.\n- **Close** — restate decisions, owners, and dates before ending.`;
  } else {
    body = `Here's how I'd approach "${message.trim()}":\n\n- **Clarify the outcome** you want before choosing the method.\n- **Break it into two or three concrete steps** you can start today.\n- **Set a checkpoint** so you can course-correct early.`;
  }

  return personalize(body, profile);
}

