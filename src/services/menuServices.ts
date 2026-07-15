import { env } from "@/env"
import { cookie } from "@/utils/cookie"

export interface MenuTypes {
    name: string,
    description: string
    price: string
    image: string
    categoryId: string
}
export interface UpdatedMenuTypes {
    name: string,
    description: string
    price: string
    image: string
    categoryId: string
    isAvailable: boolean
}

const API_URL = env.API_URL

export const menuServices = {
    createMenu: async (data: MenuTypes) => {
        const req = await fetch(`${API_URL}/meal`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Cookie: await cookie()
            },
            body: JSON.stringify(data)
        })

        return await req.json()

    },


    // services/menuServices.ts

 getAllMenu: async (params?: {
    searchTerm?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: string
}) => {
    const query = new URLSearchParams()

    if (params?.searchTerm) query.set('search', params.searchTerm)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    if (params?.sortBy) query.set('sortBy', params.sortBy)
    if (params?.sortOrder) query.set('sortOrder', params.sortOrder)

    const queryString = query.toString() ? `?${query.toString()}` : ''

    const req = await fetch(`${API_URL}/meal${queryString}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Cookie: await cookie()
        },
        next: { tags: ['menu'] }
    })

    return await req.json()
},


    getMenuById: async (id: string) => {
        const req = await fetch(`${API_URL}/meal/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Cookie: await cookie()
            }
        })

        return await req.json()

    },
    updateMenu: async (id: string, data: UpdatedMenuTypes) => {
        const req = await fetch(`${API_URL}/meal/update/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Cookie: await cookie()
            },
            body: JSON.stringify(data)
        })

        return await req.json()

    },
    deleteMenu: async (id: string) => {
        const req = await fetch(`${API_URL}/meal/${id}`, {
            method: 'delete',
            headers: {
                'content-type': 'application/json',
                Cookie: await cookie()
            }
        })

        return await req.json()

    },
}