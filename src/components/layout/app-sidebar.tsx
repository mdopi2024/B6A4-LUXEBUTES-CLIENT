import * as React from "react"

import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Routes } from "@/types"
import { adminRoutes } from "@/routes/adminRoutes"
import { providerRoutes } from "@/routes/providerRoutes"
import { customerRoutes } from "@/routes/customerRoutes"

export function AppSidebar({role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {

  let routes: Routes[] = [];

  switch (role) {
    case "CUSTOMER":
      routes = customerRoutes
      break;
    case 'PROVIDER':
      routes = providerRoutes
      break;
    case 'ADMIN':
      routes = adminRoutes
      break;
  }

  return (
    <Sidebar {...props} className="border-r border-teal-100">
      {/* Logo/Header Section */}
      <SidebarHeader className="bg-white border-b border-teal-100 p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/laxelogo.png" 
            className="w-10 h-10 rounded-full border-2 border-[#0F766E]" 
            alt="LuxeBites logo" 
          />
          <h2 className="text-xl font-bold text-[#0F766E]">LuxeBites</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#F0FDFA] pt-6">
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            {/* Group Title (যদি থাকে) */}
            {item.title && (
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-4 mb-2">
                {item.title}
              </SidebarGroupLabel>
            )}
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-3">
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton 
                      asChild
                      className="
                        hover:bg-[#FBBF24] 
                        hover:text-black
                        data-[active=true]:bg-[#0F766E] 
                        data-[active=true]:text-white
                        data-[active=true]:font-semibold
                        data-[active=true]:border-l-4 
                        data-[active=true]:border-[#FBBF24]
                        transition-all
                        rounded-lg
                        text-gray-700
                        font-medium
                      "
                    >
                      <Link href={subItem.url} className="flex items-center gap-3 w-full">
                        {/* Icon থাকলে এখানে add করো */}
                        {/* {subItem.icon && <subItem.icon className="w-5 h-5" />} */}
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail className="bg-[#0F766E]" />
    </Sidebar>
  )
}