"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ChevronRight, Circle } from "lucide-react"
import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Routes } from "@/types"
import { adminRoutes } from "@/routes/adminRoutes"
import { providerRoutes } from "@/routes/providerRoutes"
import { customerRoutes } from "@/routes/customerRoutes"

export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Track which row is currently hovered, by a unique key (title+url).
  // Using state instead of Tailwind's group-hover guarantees the icon
  // color updates correctly no matter what other "group" classes exist
  // up the tree in the shadcn sidebar primitives.
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)

  let routes: Routes[] = []

  switch (role) {
    case "CUSTOMER":
      routes = customerRoutes
      break
    case "PROVIDER":
      routes = providerRoutes
      break
    case "ADMIN":
      routes = adminRoutes
      break
  }

  const activeUrl = React.useMemo(() => {
    const allUrls = routes.flatMap((g) => g.items.map((i) => i.url))
    const matches = allUrls.filter(
      (url) => pathname === url || pathname?.startsWith(url + "/")
    )
    return matches.sort((a, b) => b.length - a.length)[0]
  }, [routes, pathname])

  return (
    <Sidebar {...props} className="border-r border-teal-100">
      {/* Logo/Header Section */}
      <SidebarHeader className="bg-gradient-to-br from-white to-teal-50 border-b border-teal-100 p-4">
        <div className="flex items-center gap-3">
          <img
            src="/laxelogo.png"
            className="w-10 h-10 rounded-full border-2 border-[#0F766E] shadow-sm"
            alt="LuxeBites logo"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#0F766E] leading-tight">LuxeBites</h2>
            <span className="text-[11px] text-gray-500 font-medium tracking-wide">
              {role.charAt(0) + role.slice(1).toLowerCase()} Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className=" pt-6">
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            {item.title && (
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-4 mb-2">
                {item.title}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-3">
                {item.items.map((subItem) => {
                  const isActive = subItem.url === activeUrl
                  const itemKey = `${item.title}-${subItem.url}`
                  const isHovered = hoveredItem === itemKey

                  // lucide-react icons are forwardRef objects, not
                  // plain functions — `typeof icon === "function"`
                  // is false for them, so just check it's set.
                  const Icon = subItem.icon || Circle

                  // Explicit color resolution (no reliance on CSS
                  // pseudo-classes at all): active = black,
                  // hovered = white, default = teal.
                  const iconColor = isActive
                    ? "#000000"
                    : isHovered
                    ? "#FFFFFF"
                    : "#0F766E"

                  return (
                    <SidebarMenuItem
                      key={subItem.title}
                      onMouseEnter={() => setHoveredItem(itemKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                           rounded-lg font-medium transition-all duration-200
                             ${isActive
                            ? "!bg-[#FBBF24] !text-black font-semibold shadow-md border-l-4 !border-[#0F766E]"
                            : "text-gray-700 hover:!bg-[#0F766E] hover:!text-white"
                          }
                        `}
                      >
                        <Link href={subItem.url} className="flex items-center justify-between w-full">
                          <span className="flex items-center gap-3">
                            <Icon
                              className="w-4 h-4 shrink-0 transition-colors duration-200"
                              style={{ color: iconColor }}
                              strokeWidth={2}
                            />
                            <span>{subItem.title}</span>
                          </span>

                          {isActive && (
                            <ChevronRight className="w-4 h-4 !text-[#0F766E] shrink-0" strokeWidth={2.5} />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Always-visible Go to Homepage button, nudged up slightly */}
      <SidebarFooter className="bg-[#F0FDFA] border-t border-teal-100 pt-3 pb-6">
        <Link
          href="/"
          className="
            flex items-center gap-2
            justify-center
            px-4 py-2.5
            rounded-lg
            font-semibold text-sm
            text-[#0F766E]
            bg-white
            border border-teal-200
            shadow-sm
            hover:bg-[#0F766E]
            hover:text-white
            hover:border-[#0F766E]
            active:scale-[0.98]
            transition-all
            duration-200
          "
        >
          <Home className="w-4 h-4" strokeWidth={2.2} />
          Go to Homepage
        </Link>
      </SidebarFooter>

      <SidebarRail className="bg-[#0F766E]" />
    </Sidebar>
  )
}