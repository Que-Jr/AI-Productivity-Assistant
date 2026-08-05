import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
export type AccentKey = "ocean" | "forest" | "purple" | "rose" | "slate";

export const ACCENTS: { key: AccentKey; name: string; description: string; swatch: string }[] = [
  {
    key: "ocean",
    name: "Ocean Blue",
    description: "Professional blue accents for a clean corporate look.",
    swatch: "oklch(0.55 0.19 255)",
  },
  {
    key: "forest",
    name: "Forest Green",
    description: "Calm and productivity-focused with green accents.",
    swatch: "oklch(0.52 0.13 158)",
  },
  {
    key: "purple",
    name: "Royal Purple",
    description: "Modern purple accents for a creative feel.",
    swatch: "oklch(0.52 0.2 295)",
  },
  {
    key: "rose",
    name: "Rose Pink",
    description: "Soft pink accents with a polished, elegant appearance.",
    swatch: "oklch(0.58 0.17 5)",
  },
  {
    key: "slate",
    name: "Slate Gray",
    description: "Neutral gray accents for a minimalist aesthetic.",
    swatch: "oklch(0.45 0.03 260)",
  },
];

const MODE_KEY = "awph.theme.mode";
const ACCENT_KEY = "awph.theme.accent";

type ThemeContextValue = {
  mode: ThemeMode;
  accent: AccentKey;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentKey) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [accent, setAccentState] = useState<AccentKey>("ocean");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedMode = localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const savedAccent = localStorage.getItem(ACCENT_KEY) as AccentKey | null;
    if (savedMode) setModeState(savedMode);
    if (savedAccent) setAccentState(savedAccent);
  }, []);

  useEffect(() => {
    const apply = () => {
      const dark = mode === "dark" || (mode === "system" && systemPrefersDark());
      setResolvedMode(dark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    localStorage.setItem(MODE_KEY, next);
  }, []);

  const setAccent = useCallback((next: AccentKey) => {
    setAccentState(next);
    localStorage.setItem(ACCENT_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ mode, accent, resolvedMode, setMode, setAccent }),
    [mode, accent, resolvedMode, setMode, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
