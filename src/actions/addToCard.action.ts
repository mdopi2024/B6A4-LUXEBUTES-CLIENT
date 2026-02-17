'use server'

import { addToCardService, CardTypes } from "@/services/addToCardServices"

export const addToCard = async(data:CardTypes)=>{
    const result = await addToCardService.addToCard(data)
    return result
}