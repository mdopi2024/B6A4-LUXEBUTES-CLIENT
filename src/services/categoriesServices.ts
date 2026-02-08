import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL
const cookieStore = cookies()

export const categoriesServices = {
    createCategory: async (data: { categoryName: string, description: string }) => {
        const req = await fetch(`${API_URL}/category`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const res =await req.json()
        return res
    },
    getAllCategory:async()=>{
        const req = await fetch(`${API_URL}/category`,{
          headers:{
            Cookie:(await cookieStore).toString()
          }
        })
        return req.json()
    },
    getCategoryById :async(id:string)=>{
        const req = await fetch(`${API_URL}/category/${id}`)
        return req.json()
    },
    updateCategory :async(data:{categoryName:string,description:string},id:string)=>{
        const req = await fetch(`${API_URL}/category/${id}`,{
            method:'PATCH',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

        return req.json()
    }
}