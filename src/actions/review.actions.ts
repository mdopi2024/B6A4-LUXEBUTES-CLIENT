'use server'

import { ReviewData, reviewServices } from "@/services/reviewServices"

export const  createReview = async(data:ReviewData)=>{
    const result = await reviewServices.createReview(data);
    return await result
}