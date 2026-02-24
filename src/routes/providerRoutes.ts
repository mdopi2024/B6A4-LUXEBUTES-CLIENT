import { Routes } from "@/types";

export const providerRoutes:Routes[] = [
    {
        title:"Provider Dashboard",
        items:[
           {
             title:"Oders",
             url:"/provider-dashboard/orders"
            },
           {
             title:"Manage Menu",
             url:"/provider-dashboard/manage-menu"
            },
           {
             title:"Add New Menu",
             url:"/provider-dashboard/add-menu"
            }
        ]
    }
]