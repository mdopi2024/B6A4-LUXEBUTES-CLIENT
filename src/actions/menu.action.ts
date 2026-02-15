'use server'

import { menuServices, MenuTypes } from "@/services/menuServices"


export const createMenu = async(data:MenuTypes)=>{
   const result = await menuServices.createMenu(data)
   return result
}