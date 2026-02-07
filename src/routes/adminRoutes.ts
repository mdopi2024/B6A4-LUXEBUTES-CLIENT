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
             title:"Manage user",
             url:"/admin-dashboard/manageUser"
            },
           {
             title:"All Categories",
             url:"/admin-dashboard/all-categories"
            },
           {
             title:"Create categories",
             url:"/admin-dashboard/create-categories"
            }
        ]
    }
]