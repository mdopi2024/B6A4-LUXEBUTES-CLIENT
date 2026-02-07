"use server";

import { categoriesServices } from "@/services/categoriesServices";


export const createCategory = async (data: { categoryName: string, description: string }) => {
 
    const result  = await categoriesServices.createCategory(data)
   return result
}