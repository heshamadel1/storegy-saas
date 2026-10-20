"use client";

/**
 * The button displays a language icon and updates the direction when clicked
 */

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardConfig } from "@/lib/dashboard/context";

export function DirectionToggle() {
  const { config, updateConfig } = useDashboardConfig();

  const toggleDirection = () => {
    updateConfig({
      direction: config.direction === "rtl" ? "ltr" : "rtl",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDirection}
      title={config.direction === "rtl" ? "Switch to LTR" : "Switch to RTL"}
    >
      <Languages />
    </Button>
  );
}
