"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/actions/category/createCategory";



const zodForm = z.object({
    categoryName: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description can not be empty")
})



const CreateCategoris = () => {
    const form = useForm({
        defaultValues: {
            categoryName: '',
            description: ''
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Category is creating...")
            try {
                const data = await createCategory(value)
                if (!data?.success) {
                    throw new Error(data?.message || "Failed to create category")
                }

                toast.success(data?.message || "New category created successfully", { id: toastId })

                form.reset();

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
                    <CardTitle>Create categories</CardTitle>
                    <CardDescription>
                        Enter the category's name and description to create a new category.
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
                            <form.Field name="categoryName" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Category </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-1" type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Category"
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
                                            placeholder="Description"
                                            autoComplete="off"
                                            readOnly
                                            onFocus={(e) => e.target.removeAttribute('readonly')}
                                        >
                                        </Textarea>
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
                        Create category
                    </Button>

                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateCategoris;




