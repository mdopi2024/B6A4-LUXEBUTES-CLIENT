"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/actions/category/createCategory";
import { createMenu } from "@/actions/menu.action";

interface CategoryType {
    categoryName:string
    createdAt:string
    description:string
    id:string
    updatedAt:string
}


const zodForm = z.object({
  name: z.string().min(1, "Menu name is required").max(50, "Menu name cannot exceed 50 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description cannot exceed 500 characters"),
  price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number (e.g., 9.99)"),
  image: z.string().min(1, "Image URL is required").url("Image must be a valid URL"),
  categoryId: z.string().min(1, "Category must be selected")
});




const AddMenus
    = () => {

        const [category, setCategory] = useState<CategoryType[]>([])

        useEffect(() => {
            const allCategory = async () => {
                const data = await getAllCategory()
                setCategory(data?.data ||[])
            }
            allCategory()
        }, [])
        const form = useForm({
            defaultValues: {
                name: '',
                description: '',
                price: '',
                image: '',
                categoryId: ''

            },
            onSubmit: async ({ value }) => {
                const toastId = toast.loading("Adding new menu..")
                try {

                     const data = await createMenu(value)
                     if(!data.success){
                        return toast.error(data.message || 'Failed to add new menu, please try again')
                     }
                    toast.success(data.message||"New menu has been added", {
                        id: toastId,
                    });

                    form.reset()

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
                        <CardTitle>Add Menu</CardTitle>
                        <CardDescription>
                            Enter menu name , description, price, image below to login to add new menu
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
                                <form.Field name="name" children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Menu name </FieldLabel>
                                            <Input
                                                className="border-2 rounded-md p-1" type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter menu name"
                                            >
                                            </Input>
                                            {
                                                isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                            }
                                        </Field>
                                    )
                                }} />
                                <form.Field name="description" children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Description </FieldLabel>
                                            <Textarea
                                                className="border-2 rounded-md p-1"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter menu description"
                                            >
                                            </Textarea>
                                            {
                                                isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                            }
                                        </Field>
                                    )
                                }} />
                                <form.Field name="price" children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Price </FieldLabel>
                                            <Input
                                                className="border-2 rounded-md p-1" type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter price"
                                            >
                                            </Input>
                                            {
                                                isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                            }
                                        </Field>
                                    )
                                }} />

                                <form.Field name="categoryId" children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Category </FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.state.value}
                                                onValueChange={(value) => field.handleChange(value)}
                                            >
                                                <SelectTrigger
                                                    id="category-select"
                                                    aria-invalid={isInvalid}
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger >
                                                <SelectContent position="popper" className=" w-full border ">
                                                    {
                                                        category && category?.map(cat =>
                                                            <SelectItem key={cat.id} className=" px-3 py-2 " value={cat?.id as string}>{cat?.categoryName}</SelectItem>
                                                        )
                                                    }

                                                </SelectContent>
                                            </Select>

                                            {
                                                isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                            }
                                        </Field>
                                    )
                                }} />

                                <form.Field name="image" children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Image URL </FieldLabel>
                                            <Input
                                                className="border-2 rounded-md p-1" type="url"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter image URL"
                                            >
                                            </Input>
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
                            Add menu
                        </Button>

                    </CardFooter>
                </Card>
            </div>
        );
    };

export default AddMenus
    ;




