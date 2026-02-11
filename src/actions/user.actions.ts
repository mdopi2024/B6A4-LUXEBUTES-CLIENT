"use server";

import { userServices } from "@/services/userServices";

export const getUserById = async(id:string)=>{
    const data = await userServices.getUserById(id);
    return  data
}