export function AppFooter() {
  return (
    <footer className="mt-10 border-t pt-6 pb-8 text-sm text-muted-foreground">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} AI Workplace Productivity Hub · Version 1.0.0</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#responsible-ai" className="transition-colors hover:text-primary">
            Privacy Notice
          </a>
          <a href="#responsible-ai" className="transition-colors hover:text-primary">
            Responsible AI
          </a>
          <a href="mailto:support@productivityhub.app" className="transition-colors hover:text-primary">
            Contact Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
