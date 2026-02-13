"use server";

import { userServices } from "@/services/userServices";
import { revalidateTag } from "next/cache";


export const getUserById = async(id:string)=>{
    const data = await userServices.getUserById(id);
    return  data
}
export const updateUserStatus = async(id:string,value:{status:"ACTIVE" | "SUSPENDED"})=>{
    const data = await userServices.updatUserStatus(id,value);
    revalidateTag('user','max')
    return  data
}
export const updateUserRole = async(id:string,value:{role:'PROVIDER' | 'ADMIN' | 'CUSTOMER'})=>{
    const data = await userServices.updatUserRole(id,value);
    revalidateTag('user','max')
    return  data
}
