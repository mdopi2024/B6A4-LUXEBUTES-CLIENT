import { env } from "@/env"
import { cookie } from "@/utils/cookie"

export interface MenuTypes {
    name:string, 
    description:string
    price:string
    image:string
    categoryId:string
}
export interface UpdatedMenuTypes {
    name:string, 
    description:string
    price:string
    image:string
    categoryId:string
    isAvailable:boolean
}

const API_URL = env.API_URL

export const menuServices = {
    createMenu:async(data:MenuTypes)=>{
        const req = await fetch(`${API_URL}/meal`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            },
            body:JSON.stringify(data)
        })

        return await req.json()

    },
    getAllMenu:async()=>{
        const req = await fetch(`${API_URL}/meal`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            },
            next:{tags:['menu']}
        })

        return await req.json()

    },
    getMenuById:async(id:string)=>{
        const req = await fetch(`${API_URL}/meal/${id}`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            }
        })

        return await req.json()

    },
     updateMenu:async(id:string,data:UpdatedMenuTypes)=>{
        const req = await fetch(`${API_URL}/meal/update/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            },
            body:JSON.stringify(data)
        })

        return await req.json()

    },
     deleteMenu:async(id:string)=>{
        const req = await fetch(`${API_URL}/meal/${id}`,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            }
        })

        return await req.json()

    },
}