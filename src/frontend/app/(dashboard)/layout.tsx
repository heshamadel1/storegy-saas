"use client";

/**
 * DashboardLayout component provides the layout for the dashboard pages. It includes the sidebar, header, footer, and main content area
 * The layout is wrapped with an AuthGuard to ensure that only authenticated users can access the dashboard
 * The DashboardConfigProvider allows for configuration of the dashboard layout, such as direction and collapsibility of the sidebar
 */
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader1 } from "@/components/dashboard/header";
import { DashboardFooter } from "@/components/dashboard/footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  DashboardConfigProvider,
  useDashboardConfig,
} from "@/lib/dashboard/context";

const DashboardLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { config } = useDashboardConfig();

  return (
    <div dir={config.direction} className="min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3rem",
            "--header-height": "calc(var(--spacing) * 14)",
          } as React.CSSProperties
        }
        className={config.collapsible === "none" ? "sidebar-none-mode" : ""}
      >
        <DashboardSidebar
          side={config.direction === "rtl" ? "right" : "left"}
          collapsible={config.collapsible}
        />
        <SidebarInset>
          <DashboardHeader1 />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
          <DashboardFooter />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardConfigProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>{" "}
    </DashboardConfigProvider>
  );
};

export default DashboardLayout;
