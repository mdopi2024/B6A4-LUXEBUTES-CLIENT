import { Routes } from "@/types";

export const adminRoutes:Routes[] = [
    {
        title:"Administration",
        items:[
           {
             title:"Dashboard",
             url:"/admin-dashboard"
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