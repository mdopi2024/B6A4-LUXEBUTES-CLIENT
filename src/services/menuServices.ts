import { env } from "@/env"
import { cookie } from "@/utils/cookie"

export interface MenuTypes {
    name:string, 
    description:string
    price:string
    image:string
    categoryId:string
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
            }
        })

        return await req.json()

    }
}