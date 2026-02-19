'use server'

import { addToCardService, CardTypes } from "@/services/addToCardServices"
import { revalidateTag } from "next/cache"

export const addToCard = async(data:CardTypes)=>{
    const result = await addToCardService.addToCard(data)
    return result
}
export const getAllCardItems = async(id:string)=>{
    const result = await addToCardService.getAllCardItems(id)
    return result
}
export const deleteCardItem = async(id:string)=>{
    const result = await addToCardService.deleteCardItem(id)
    revalidateTag("card-item",'max')
    return result
}