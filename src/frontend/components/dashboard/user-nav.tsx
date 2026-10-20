"use client";

/**
 * UserNav component displays the user navigation menu in the dashboard sidebar
 * and handles user logout
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  EllipsisVertical,
  LogOut,
  BellDot,
  CircleUser,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function UserNav({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Handle logout
  async function handleLogout() {
    if (loading) return;
    setLoading(true);

    router.replace("/login");
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            {/* User avatar and information */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <span>avatar</span>
            </div>

            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <EllipsisVertical className="ms-auto size-4" />
          </DropdownMenuTrigger>

          {/* Dropdown menu content for user navigation options */}
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                    <span>avatar</span>
                  </div>

                  <div className="grid flex-1 text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            {/* Dropdown menu items for account settings, billing, notifications, and logout */}
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={<Link href="#" />}
                className="cursor-pointer"
              >
                <CircleUser />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href="#" />}
                className="cursor-pointer"
              >
                <CreditCard />
                Billing
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href="#" />}
                className="cursor-pointer"
              >
                <BellDot />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              disabled={loading}
              className="cursor-pointer"
            >
              {" "}
              <LogOut /> {loading ? "Logging out..." : "Log out"}{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
