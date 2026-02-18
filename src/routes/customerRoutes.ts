import { Routes } from "@/types";



export const customerRoutes:Routes[] = [
    {
        title:"My Account",
        items:[
           {
             title:"Profile",
             url:"/dashboard"
            },
           {
             title:"My Card",
             url:"/dashboard/my-card"
            }
        ]
    }
]