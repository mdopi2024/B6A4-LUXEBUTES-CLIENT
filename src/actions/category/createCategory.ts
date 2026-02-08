"use server";

import { categoriesServices } from "@/services/categoriesServices";


export const createCategory = async (data: { categoryName: string, description: string }) => {
 
    const result  = await categoriesServices.createCategory(data)
   return result
}

export const updateCategory = async(data:{categoryName:string,description:string}, id:string)=>{
    const result = await  categoriesServices.updateCategory(data,id)
    return result
}