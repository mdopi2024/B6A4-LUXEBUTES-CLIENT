import { Routes } from "@/types";
import { LucideIcon } from "lucide-react";
import {
  User,
  ShoppingCart,
  Users,
  LayoutGrid,
  FolderPlus,
} from "lucide-react";

export const adminRoutes: Routes[] = [
  {
    title: "Administration",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard",
        icon: User,
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
        icon: ShoppingCart,
      },
      {
        title: "Manage User",
        url: "/admin-dashboard/manageUser",
        icon: Users,
      },
      {
        title: "All Categories",
        url: "/admin-dashboard/all-categories",
        icon: LayoutGrid,
      },
      {
        title: "Create Categories",
        url: "/admin-dashboard/create-categories",
        icon: FolderPlus,
      },
    ],
  },
];
