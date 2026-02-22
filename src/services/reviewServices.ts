
import { env } from "@/env"
import { cookie } from "@/utils/cookie"
export interface ReviewData{
    comment :string,
    rating:number,
    mealId:string,
    userId:string
}
const API_URL = env.API_URL

export const reviewServices ={
    createReview:async(data:ReviewData)=>{
        const req= await fetch(`${API_URL}/review`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                Cookie:await cookie()
            },
            body:JSON.stringify(data)
        })
        return await req.json()
    },
    getReviewByMealId:async(id:string)=>{
        const req= await fetch(`${API_URL}/review/${id}`,{
            method:'GET',
            headers:{
                Cookie:await cookie()
            }
        })
        return await req.json()
    }
}
