import { env } from "@/env";

import { cookies } from "next/headers";

const API_URL = env.API_URL

const cookie = async () => {
    const cookieStore = await cookies()
    return cookieStore.toString()
}

export const categoriesServices = {

    createCategory: async (data: { categoryName: string, description: string }) => {
        const req = await fetch(`${API_URL}/category`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                Cookie: await cookie()
            },
            body: JSON.stringify(data)

        })
        const res = await req.json()
        return res
    },
    getAllCategory: async () => {
        const req = await fetch(`${API_URL}/category`, {
            headers: {
                Cookie: await cookie()
            },
            next: { tags: ["category"] }
        })
        return  req.json()
    },
    getCategoryById: async (id: string) => {
        const req = await fetch(`${API_URL}/category/${id}`, {
            headers: {
                Cookie: await cookie()
            }
        })
        return req.json()
    },
    updateCategory: async (data: { categoryName: string, description: string }, id: string) => {
        const req = await fetch(`${API_URL}/category/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                Cookie: await cookie()
            },
            body: JSON.stringify(data)
        })

        return req.json()
    },
    deleteCategory: async (id: string) => {
        const req = await fetch(`${API_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                Cookie: await cookie()
            },
        })

        return req.json()
    }
}