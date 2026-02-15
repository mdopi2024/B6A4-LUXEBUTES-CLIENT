'use server'

import { menuServices, MenuTypes } from "@/services/menuServices"



export const createMenu = async(data:MenuTypes)=>{
   const result = await menuServices.createMenu(data)
   return result
}
export const getAllMenu = async()=>{
   const result = await menuServices.getAllMenu()
   return result
}