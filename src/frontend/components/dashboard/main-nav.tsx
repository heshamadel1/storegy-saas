"use client";

import { useState } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type NavSubItem = {
  title: string;
  url: string;
  target?: React.HTMLAttributeAnchorTarget;
  isActive?: boolean;
};

type NavItem = {
  title: string;
  url: string;
  target?: React.HTMLAttributeAnchorTarget;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
};

// Renders a navigation item with an optional collapsible submenu.
function MainNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasSubItems = Boolean(item.items?.length);

  const shouldBeOpen =
    Boolean(item.isActive) ||
    (item.items?.some(
      (subItem) =>
        pathname === subItem.url || pathname.startsWith(`${subItem.url}/`),
    ) ??
      false);

  const [open, setOpen] = useState(shouldBeOpen);

  if (!hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          render={
            <Link
              href={item.url}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            />
          }
          tooltip={item.title}
          className="cursor-pointer"
          isActive={
            pathname === item.url || pathname.startsWith(`${item.url}/`)
          }
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      open={open || shouldBeOpen}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton
              tooltip={item.title}
              className="cursor-pointer"
            />
          }
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          <ChevronRight className="ms-auto size-4 shrink-0 transition-transform duration-300 ease-in-out group-data-[open]/collapsible:rotate-90 rtl:group-data-[open]/collapsible:-rotate-90" />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  render={
                    <Link
                      href={subItem.url}
                      target={subItem.target}
                      rel={
                        subItem.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  }
                  className="cursor-pointer"
                  isActive={
                    pathname === subItem.url ||
                    pathname.startsWith(`${subItem.url}/`)
                  }
                >
                  <span>{subItem.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

// Renders a sidebar navigation group and passes the current route to each item.
export function MainNav({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <MainNavItem key={item.title} item={item} pathname={pathname} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
