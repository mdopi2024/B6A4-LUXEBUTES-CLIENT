"use server";

import { categoriesServices } from "@/services/categoriesServices";
import { revalidateTag } from "next/cache";



export const createCategory = async (data: { categoryName: string, description: string }) => {
 
    const result  = await categoriesServices.createCategory(data)
   return result
}

export const updateCategory = async(data:{categoryName:string,description:string}, id:string)=>{
    const result = await  categoriesServices.updateCategory(data,id)
    return result
}
export const deleteCategory = async(id:string)=>{
    const result = await  categoriesServices.deleteCategory(id)
    revalidateTag('category','max')
    return result
}

export const getAllCategory = async()=>{
    const result= await categoriesServices.getAllCategory()
    return result
}