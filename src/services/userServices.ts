import { env } from "@/env"
import { cookies } from "next/headers"

const AUTH_URL = env.AUTH_URL
export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = cookies()
            const req = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: (await cookieStore).toString()
                },
                cache:'no-store'
            });
            const session =await req.json();
            if(!session) return null
            return session
        } catch (error) {
            return error
        }
    }
}