"use client";

/**
 * The DashboardSidebar component renders the sidebar for the dashboard layout. It includes the logo, main navigation, and user navigation.
 */
import { LayoutDashboard, Shield, Users } from "lucide-react";
import Link from "next/link";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "StoreName",
    email: "store@example.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Apps",
      items: [{ title: "App", url: "#", icon: Users }],
    },
    {
      label: "Pages",
      items: [
        {
          title: "Dropdowns",
          url: "#",
          icon: Shield,
          items: [
            { title: "SubMenu1", url: "#" },
            { title: "SubMenu2", url: "#" },
          ],
        },
      ],
    },
  ],
};

export function DashboardSidebar({
  side,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side={side} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="sr-only">Logo</span>
              </div>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">StoreName</span>
                <span className="truncate text-xs">Admin Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Main navigation section of the sidebar */}
      <SidebarContent>
        {data.navGroups.map((group) => (
          <MainNav key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      {/* User navigation section at the bottom of the sidebar */}
      <SidebarFooter>
        <UserNav user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
