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
            }
        ]
    }
]