import { LogOut } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Header() {
    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        window.location.href = "/login";
    };

    return (
        <header className="h-20 bg-surface-lowest/60 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
                Dashboard
            </h2>

            <div className="flex items-center gap-3 border-l border-border/10 pl-6">
              <ThemeToggle />
              <button
                  onClick={logout}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Logout"
              >
                  <LogOut size={20} />
              </button>
            </div>
        </header>
    );
}