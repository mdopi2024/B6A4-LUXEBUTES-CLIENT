"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserById, updateUserStatus } from "@/actions/user.actions";
import {  useEffect, useState } from "react";
import { userServices } from "@/services/userServices";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: 'PROVIDER' | 'ADMIN' | 'USER'; 
  status: 'ACTIVE' | 'SUSPENDED'; 
  createdAt: string;
  updatedAt: string; 
}



const zodForm = z.object({
    status: z.enum(['ACTIVE' , 'SUSPENDED'])
})



const UpdateUserStatus = () => {
    const {id} = useParams();
    const [user,setUser]= useState<User | null>(null)
    useEffect(()=>{
         const userData = async()=>{
            const data = await getUserById(id as string)
            setUser(data?.data)
         }
         userData()
    },[id])
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            status: user?.status || "ACTIVE"
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updating user status ...")
            try {
                 const data = await updateUserStatus(user?.id as string,value)
                 if(!data.success){
                    return toast.error(data?.message || "Faile to update status",{id:toastId})
                 }
                 toast.success(data?.message || "user status updated successfullly",{id:toastId})
                router.push('/admin-dashboard/manageUser')
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
                    <CardTitle>Update user status</CardTitle>
                    <CardDescription>
                        Enter user updated status to update
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
                                            onValueChange={(value) => field.handleChange(value as "ACTIVE" | "SUSPENDED")}
                                        >
                                            <SelectTrigger
                                                id="status-select"
                                                aria-invalid={isInvalid}
                                                className="max-w-[120px]"
                                            >
                                                  <SelectValue placeholder="Select status" /> 
                                            </SelectTrigger >
                                            <SelectContent  position="popper" className=" w-full border ">
                                                <SelectItem className=" px-3 py-2 " value="ACTIVE">ACTIVE</SelectItem>
                                                <SelectItem className=" px-3 py-2 " value="SUSPENDED">SUSPENDED</SelectItem>
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

export default UpdateUserStatus;




