"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { getSession } from "@/actions/user.actions";
import { createReview } from "@/actions/review.actions";





const zodForm = z.object({
    comment: z.string().min(5, "Comment must be at least 5 characters long").max(500, "Comment cannot exceed 500 characters"),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating can not exceed 5"),
});


const ReviewPage = () => {

    const router = useRouter()
    const { id } = useParams();
    const form = useForm({
        defaultValues: {
            comment: '',
            rating: 5
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Submitting your review...")
            try {
                const { user } = await getSession()
                if (!user) return toast.error("Please log in to submit a review.", { id: toastId })
                const reviewData = { ...value, userId: user?.id as string, mealId: id as string }
                const data = await createReview(reviewData)
                if (!data?.success) {
                    console.log(data.messag)
                    return toast.error(data?.message || "Failed to submit your review. Please try again.", { id: toastId })

                }

                toast.success("Your review has been submitted successfully!", { id: toastId });
                router.push('/dashboard/my-orders')
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
                    <CardTitle>Write a Review</CardTitle>
                    <CardDescription>
                        Share your thoughts about this meal. Your feedback helps others and the provider.
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
                            <form.Field name="comment" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Review </FieldLabel>
                                        <Textarea
                                            className="border-2 rounded-md p-1"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Write your review here..."
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
                            <form.Field name="rating" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Rating </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-3 font-semibold"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(+e.target.value)}
                                            placeholder="Rate this meal (1-5 stars)"
                                            autoComplete="off"
                                            readOnly
                                            onFocus={(e) => e.target.removeAttribute('readonly')}
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
                        Submit Review
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ReviewPage;




