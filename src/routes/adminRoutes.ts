import { Routes } from "@/types";

export const adminRoutes:Routes[] = [
    {
        title:"Administration",
        items:[
           {
             title:"Profile",
             url:"/admin-dashboard"
            },
           {
             title:"Orders",
             url:"/admin-dashboard/orders"
            },
           {
             title:"Manage User",
             url:"/admin-dashboard/manageUser"
            },
           {
             title:"All Categories",
             url:"/admin-dashboard/all-categories"
            },
           {
             title:"Create Categories",
             url:"/admin-dashboard/create-categories"
            }
        ]
    }
]