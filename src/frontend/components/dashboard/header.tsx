"use client";

/**
 * This component renders the header for the dashboard page
 */
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DirectionToggle } from "./direction-toggle";

export function DashboardHeader1() {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ms-1" />

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              ref={searchRef}
              type="search"
              placeholder="Search..."
              className="ps-9 pe-14"
              aria-label="Search"
            />

            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {typeof navigator !== "undefined" &&
              /Mac|iPhone|iPad/.test(navigator.userAgent)
                ? "⌘ K"
                : "Ctrl K"}
            </span>
          </div>

          <div className="ms-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() =>
                window.open(
                  "www.linkedin.com/in/heshamadel1",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              LinkedIn
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() => window.open("#", "_blank", "noopener,noreferrer")}
            >
              Page
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() =>
                window.open(
                  "https://github.com/heshamadel1",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              GitHub
            </Button>

            <DirectionToggle />
          </div>
        </div>
      </header>
    </>
  );
}
