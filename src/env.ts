
import { createEnv } from "@t3-oss/env-nextjs"; 
import { z } from "zod";

export const env = createEnv({
    server: {
        FRONTEND_URL: z.url(),
        BACKENE_URL: z.url(),
        API_URL: z.url(),
        AUTH_URL: z.url()
    },

    runtimeEnv: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKENE_URL: process.env.BACKENE_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL
    },
});