import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar, type ViewKey } from "./AppSidebar";

export function TopBar({
  active,
  onNavigate,
  onLogout,
}: {
  active: ViewKey;
  onNavigate: (key: ViewKey) => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
            <Menu className="size-5" aria-hidden />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppSidebar active={active} onNavigate={onNavigate} onLogout={onLogout} />
        </SheetContent>
      </Sheet>

      <form
        className="relative hidden max-w-md flex-1 sm:block"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <label htmlFor="global-search" className="sr-only">
          Search the workspace
        </label>
        <Input
          id="global-search"
          placeholder="Search tasks, research and chats…"
          className="rounded-xl pl-9"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5" aria-hidden />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
        </Button>
        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          QJ
        </span>
      </div>
    </header>
  );
}
