"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus } from "@/actions/order.actions";

const zodForm = z.object({
    status: z.string().min(1, 'this field is required')
})



const UpdateOrderStatus = () => {
    const { id } = useParams();
    const [status, setStatus] = useState(null)
    useEffect(() => {
        const singleOrder = async () => {
            const { data } = await getOrderById(id as string)
               setStatus(data?.status)
        }
        singleOrder()
    }, [id])
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            status: status || ''
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updating user role ...")
            try {
                 const data = await updateOrderStatus(id as string,value )
                 if(!data.success){
                    return toast.error(data?.message || "Faile to update status",{id:toastId})
                 }
                 toast.success(data?.message || "Order status updated successfullly",{id:toastId})
                router.push('/admin-dashboard/orders')
            } catch (error) {
                toast.error("Something went wrong. Please try again later.", { id: toastId })
            }
        },
        validators: {
            onSubmit: zodForm
        }
    })
    return (
        <div className="flex justify-center items-center pt-14">
            <Card className="w-full max-w-sm mx-auto  ">
                <CardHeader>
                    <CardTitle>Update order status</CardTitle>
                    <CardDescription>
                        Enter the updated status of the order to update.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form
                        id="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}>
                        <FieldGroup>
                            <form.Field name="status" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Status </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={(value) => field.handleChange(value)}
                                        >
                                            <SelectTrigger
                                                id="status-select"
                                                aria-invalid={isInvalid}

                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger >
                                            <SelectContent position="popper" className=" w-full border ">
                                                <SelectItem className=" px-3 py-2 " value="PREPARING">PREPARING</SelectItem>
                                                <SelectItem className=" px-3 py-2 text-black" value="READY">READY</SelectItem>
                                                <SelectItem className=" px-3 py-2 " value="DELIVERED">DELIVERED</SelectItem>
                                                <SelectItem className=" px-3 py-2 " value="CANCELLED">CANCELLED</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {
                                            isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                        }
                                    </Field>
                                )
                            }} />

                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="form" className="w-full bg-[#FBBF24] hover:bg-[#FBBF24]  text-black">
                        Update status
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UpdateOrderStatus;




