import { Routes } from "@/types";
import { User, ShoppingCart, UtensilsCrossed, PlusCircle } from "lucide-react";

export const providerRoutes: Routes[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        title: "Profile",
        url: "/provider-dashboard",
        icon: User,
      },
      {
        title: "Orders",
        url: "/provider-dashboard/orders",
        icon: ShoppingCart,
      },
      {
        title: "Manage Menu",
        url: "/provider-dashboard/manage-menu",
        icon: UtensilsCrossed,
      },
      {
        title: "Add New Menu",
        url: "/provider-dashboard/add-menu",
        icon: PlusCircle,
      },
    ],
  },
];

