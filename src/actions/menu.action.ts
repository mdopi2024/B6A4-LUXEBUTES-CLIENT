'use server'

import { menuServices, MenuTypes, UpdatedMenuTypes } from "@/services/menuServices"
import { revalidateTag } from "next/cache"

interface GetAllMenuParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export const createMenu = async(data:MenuTypes)=>{
   const result = await menuServices.createMenu(data)
   return result
}


// actions/menu.action.ts

export const getAllMenu = async (params: GetAllMenuParams = {}) => {
  const { searchTerm, page, limit, sortBy, sortOrder } = params;

  return await menuServices.getAllMenu({
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

export const getMenuById = async(id:string)=>{
   const result = await menuServices.getMenuById(id)
   return result
}
export const updateMenu = async(id:string,data:UpdatedMenuTypes)=>{
   const result = await menuServices.updateMenu(id,data)
   revalidateTag('menu','max')
   return result
}
export const deleteMenu = async(id:string)=>{
   const result = await menuServices.deleteMenu(id)
   revalidateTag('menu','max')
   return result
}