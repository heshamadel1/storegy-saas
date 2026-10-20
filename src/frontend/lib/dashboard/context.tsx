"use client";

/**
 * This context provides the configuration for the dashboard layout, including direction and collapsible behavior
 * The configuration includes:
 * - direction: "ltr" | "rtl" - The text direction of the dashboard layout
 * - collapsible: "offcanvas" | "icon" | "none" - The collapsible behavior of the sidebar
 */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

/*
 * The DashboardConfig type defines the structure for the dashboard configuration
 */
type DashboardConfig = {
  direction: "ltr" | "rtl";
  collapsible: "offcanvas" | "icon" | "none";
};

/**
 * It includes the current configuration and a function to update the configuration
 */
type DashboardConfigContextValue = {
  config: DashboardConfig;
  updateConfig: (config: Partial<DashboardConfig>) => void;
};

const DashboardConfigContext =
  createContext<DashboardConfigContextValue | null>(null);

/**
 *  It manages the state of the configuration and provides a function to update it
 *  The initial configuration is set to direction: "ltr" and collapsible: "offcanvas"
 *  The updateConfig function allows for partial updates to the configuration
 *  The provider wraps its children with the DashboardConfigContext.Provider
 *  The value provided includes the current configuration and the updateConfig function
 *  This allows any component within the provider to access and modify the dashboard configuration
 */
export function DashboardConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<DashboardConfig>({
    direction: "ltr",
    collapsible: "offcanvas",
  });

  const updateConfig = useCallback((newConfig: Partial<DashboardConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  }, []);

  return (
    <DashboardConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </DashboardConfigContext.Provider>
  );
}

export function useDashboardConfig() {
  const context = useContext(DashboardConfigContext);

  if (!context) {
    throw new Error(
      "useDashboardConfig must be used within a DashboardConfigProvider",
    );
  }

  return context;
}
