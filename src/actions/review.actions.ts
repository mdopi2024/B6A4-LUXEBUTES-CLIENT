'use server'

import { ReviewData, reviewServices } from "@/services/reviewServices"

export const  createReview = async(data:ReviewData)=>{
    const result = await reviewServices.createReview(data);
    return await result
}
export const  getReviewByMealId = async(id:string)=>{
    const result = await reviewServices.getReviewByMealId(id);
    return await result
}