/**
 * This component renders the footer for the dashboard page
 */

import { Heart } from "lucide-react";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made by</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <Link
              href="www.linkedin.com/in/heshamadel1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              H
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Storegy E-commerce SaaS Dashboard © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
