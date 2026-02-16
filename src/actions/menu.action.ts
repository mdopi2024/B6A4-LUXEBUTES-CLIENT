'use server'

import { menuServices, MenuTypes, UpdatedMenuTypes } from "@/services/menuServices"



export const createMenu = async(data:MenuTypes)=>{
   const result = await menuServices.createMenu(data)
   return result
}
export const getAllMenu = async()=>{
   const result = await menuServices.getAllMenu()
   return result
}
export const getMenuById = async(id:string)=>{
   const result = await menuServices.getMenuById(id)
   return result
}
export const updateMenu = async(id:string,data:UpdatedMenuTypes)=>{
   const result = await menuServices.updateMenu(id,data)
   return result
}