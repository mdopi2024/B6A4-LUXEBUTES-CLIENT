import { env } from "@/env";

const API_URL = env.API_URL

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
        const req = await fetch(`${API_URL}/category`)
        return req.json()
    },
    getCategoryById :async(id:string)=>{
        const req = await fetch(`${API_URL}/category/${id}`)
        return req.json()
    }
}