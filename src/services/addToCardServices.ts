import { env } from "@/env"
import { cookie } from "@/utils/cookie"

export interface CardTypes{
    userId:string,
    mealId:string

}

const API_URL = env.API_URL

 export const addToCardService = {
    addToCard : async(data:CardTypes)=>{
   const req= await fetch(`${API_URL}/add-item`,{
    method:'POST',
    headers:{
        "content-type":"application/json",
        Cookie:await cookie()
    },
    body:JSON.stringify(data)
   })

   return await req.json()
}
 }