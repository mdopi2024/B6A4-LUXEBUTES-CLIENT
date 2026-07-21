"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCardItemById } from "@/actions/addToCard.action";
import { createOrder } from "@/actions/order.actions";
import { useRouter } from "next/navigation";



const zodForm = z.object({
    delevaryAddress: z.string().min(5, "Please enter a valid delivery address (at least 5 characters)."),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    paymentMethod: z.string().min(1, "Payment method is required")
});

// Backend response shape এখনও পুরোপুরি নিশ্চিত না হওয়ায়,
// দুই ধরনের সম্ভাব্য shape-ই handle করা হচ্ছে:
// 1) { success, message, data: { order, payment, paymentUrl } }
// 2) { order, payment, paymentUrl }  <-- বর্তমান backend যা রিটার্ন করছে
type OrderResponse = {
    success?: boolean;
    message?: string;
    data?: {
        order?: unknown;
        payment?: unknown;
        paymentUrl?: string | null;
    };
    order?: unknown;
    payment?: unknown;
    paymentUrl?: string | null;
};

const OrderForm = ({ userId, id }: { userId: string, id: string }) => {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            delevaryAddress: '',
            quantity: 1,
            paymentMethod: ''
        },
        onSubmit: async ({ value }) => {
            if (!userId) {
                toast.error("Please log in to place your order.")
                return
            }

            const toastId = toast.loading("Placing your order...")

            try {
                const { data: cardData } = await getCardItemById(id)

                if (!cardData?.meal?.id) {
                    toast.error("Meal information could not be found. Please try again.", { id: toastId })
                    return
                }

                const totalAmount = Number(cardData.meal.price) * Number(value.quantity)

                const orderData = {
                    ...value,
                    userId,
                    totalAmount,
                    mealId: cardData.meal.id,
                }

                const order: OrderResponse = await createOrder(orderData)

                // 👇 ডিবাগ করার জন্য - সমস্যা সমাধানের পর এই লাইন সরিয়ে ফেলুন
                console.log("order response:", JSON.stringify(order, null, 2))

                // order/payment তৈরি হয়েছে কিনা - দুই ধরনের shape-ই চেক করা হচ্ছে
                const orderCreated = order?.order ?? order?.data?.order
                const paymentCreated = order?.payment ?? order?.data?.payment

                // যদি backend explicit success flag পাঠায় সেটাকেও honor করা হচ্ছে,
                // কিন্তু flag না থাকলে order/payment object থাকলেই success ধরে নেওয়া হচ্ছে
                const isSuccess =
                    order?.success === true ||
                    (order?.success === undefined && !!orderCreated && !!paymentCreated)

                if (!isSuccess) {
                    toast.error(
                        order?.message || "Unable to process your order. Please try again.",
                        { id: toastId }
                    )
                    return
                }

                const isCashOnDelivery =
                    value.paymentMethod.trim().toLowerCase() === "cash on delivery"

                // Cash on Delivery হলে Stripe redirect দরকার নেই - সরাসরি dashboard এ পাঠানো হবে
                if (isCashOnDelivery) {
                    toast.success(order?.message || "Your order has been successfully placed.", { id: toastId })
                    router.push('/dashboard/my-card')
                    return
                }

                // Stripe flow - paymentUrl খুঁজে বের করা হচ্ছে (backend response এর সম্ভাব্য বিভিন্ন structure এর জন্য fallback সহ)
                const paymentUrl =
                    order?.paymentUrl ??
                    order?.data?.paymentUrl

                if (paymentUrl) {
                    toast.success("Redirecting to payment page...", { id: toastId })
                    window.location.href = paymentUrl
                    return
                }

                // paymentUrl কোথাও না পাওয়া গেলে
                toast.error("Payment session could not be created. Please try again.", { id: toastId })
            } catch (error) {
                console.error("Order submission failed:", error)
                toast.error("Unable to place your order. Please try again.", { id: toastId })
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
                    <CardTitle>Place Your Order</CardTitle>
                    <CardDescription>
                        Provide your delivery details and confirm your order below.
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
                            <form.Field name="quantity" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Quantity </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-3 font-semibold" type="number"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(+e.target.value)}
                                            placeholder="Quantity"
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
                            <form.Field name="delevaryAddress" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Address </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-1" type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Address"
                                        >
                                        </Input>
                                        {
                                            isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                        }
                                    </Field>
                                )
                            }} />

                            <form.Field name="paymentMethod" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Payment method </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={(value) => field.handleChange(value)}
                                        >
                                            <SelectTrigger
                                                id="paymentMethod-select"
                                                aria-invalid={isInvalid}
                                            >
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent position="popper" className="w-full border">
                                                <SelectItem className="px-3 py-2" value="stripe">
                                                    Credit/Debit Card (Stripe)
                                                </SelectItem>
                                                <SelectItem className="px-3 py-2" value="Cash on Delivery">
                                                    Cash on Delivery
                                                </SelectItem>
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
                        Place Order
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrderForm;