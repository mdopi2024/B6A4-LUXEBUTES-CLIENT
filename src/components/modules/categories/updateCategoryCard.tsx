"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface SingleCategory {
    id:string;
    categoryName:string;
    description:string;
    createdAt: string;
    updatedAt:string;
}

const UpdateCategoryCard = ({data}:{data:SingleCategory}) => {
    const {categoryName, description} = data
    const form = useForm({
        defaultValues: {
            categoryName,
            description
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updating category...")
            try {
               console.log(value)
            } catch (error) {
                toast.error("Something went wrong. Please try again later.", { id: toastId })
            }
        },
    })
    return (
        <div className="flex justify-center items-center pt-14">
            <Card className="w-full max-w-sm mx-auto  ">
                <CardHeader>
                    <CardTitle>Update category</CardTitle>
                    <CardDescription>
                        Enter the new category name or description to update the category.
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

                                    </Field>
                                )
                            }} />
                            <form.Field name="description" children={(field) => {

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

                                    </Field>

                                )
                            }} />

                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="form" className="w-full bg-[#FBBF24] hover:bg-[#FBBF24]  text-black">
                        Update category
                    </Button>

                </CardFooter>
            </Card>
        </div>
    );
};

export default UpdateCategoryCard;




