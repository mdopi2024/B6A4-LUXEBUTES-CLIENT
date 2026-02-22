'use server'

import { orderServices, OrderTypes } from "@/services/orderServices"

export const createOrder = async(data:OrderTypes)=>{
    const result = await orderServices.createOrder(data);
     return result
}
export const getOrderByUserId = async(id:string)=>{
    const result = await orderServices.getOrderByUserId(id);
     return result
}