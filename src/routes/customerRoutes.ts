import { Routes } from "@/types";
import { User, CreditCard, ShoppingBag } from "lucide-react";

export const customerRoutes: Routes[] = [
    {
        title: "My Account",
        items: [
            {
                title: "Profile",
                url: "/dashboard",
                icon: User
            },
            {
                title: "My Card",
                url: "/dashboard/my-card",
                icon: CreditCard
            },
            {
                title: "My Orders",
                url: "/dashboard/my-orders",
                icon: ShoppingBag
            }
        ]
    }
]

