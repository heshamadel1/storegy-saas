"use client";

/**
 * This component renders the quick actions section in the dashboard header
 */
import { Download, FileText, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      <Button className="cursor-pointer">
        <Plus className="me-2 h-4 w-4" />
        New Sale
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="cursor-pointer" />}
        >
          <Settings className="me-2 h-4 w-4" />
          Actions
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="me-2 h-4 w-4" />
            Generate Report
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Download className="me-2 h-4 w-4" />
            Export Data
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Settings className="me-2 h-4 w-4" />
            Dashboard Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
