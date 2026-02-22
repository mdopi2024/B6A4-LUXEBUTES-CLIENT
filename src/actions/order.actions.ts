'use server'

import { orderServices, OrderTypes } from "@/services/orderServices"
import { revalidateTag } from "next/cache";

export const createOrder = async(data:OrderTypes)=>{
    const result = await orderServices.createOrder(data);
     return result
}
export const getOrderByUserId = async(id:string)=>{
    const result = await orderServices.getOrderByUserId(id);
     return result
}
export const updateOrderStatus = async(id:string,data:{status:string})=>{
    const result = await orderServices.updateOrderStatus(id,data);
    revalidateTag('customer-order',"max")
     return result
}