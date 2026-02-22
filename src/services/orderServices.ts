
import { env } from "@/env"
import { cookie } from "@/utils/cookie"

export interface OrderTypes {
    mealId:string,
    userId:string,
    totalAmount:number,
    quantity:number,
    paymentMethod:string,
    delevaryAddress:string
}

const API_URL = env.API_URL

export const orderServices = {
    createOrder:async(data:OrderTypes)=>{
      const req = await fetch(`${API_URL}/order`,{
        method:"POST",
        headers:{
            'content-type':'application/json',
            Cookie:await cookie()
        },
        body:JSON.stringify(data)
      })
      return await req.json()
    },
    getOrderByUserId:async(id:string)=>{
      const req = await fetch(`${API_URL}/order/${id}`,{
        method:"GET",
        headers:{
            'content-type':'application/json',
            Cookie:await cookie()
        },
      })
      return await req.json()
    }
}