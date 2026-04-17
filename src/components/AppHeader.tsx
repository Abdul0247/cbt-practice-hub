import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Cbt Practice Hub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {isHome ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/student-login">Student Login</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Teacher Dashboard</Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {isHome ? (
              <>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/student-login" onClick={() => setMobileOpen(false)}>Student Login</Link>
                </Button>
                <Button className="justify-start" asChild>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Teacher Dashboard</Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
