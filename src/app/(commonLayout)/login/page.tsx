"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const zodForm = z.object({
    password: z.string().min(8, "password must be 8 charecter"),
    email: z.email()
})



const LoginPage = () => {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging you in...")
            try {
                const { data, error } = await authClient.signIn.email(value)
                if (error) {
                    toast.error(error.message || "Invalid email or password.", {
                        id: toastId,
                    });
                    return;
                }
                toast.success(" Logged in successfully! Welcome back.", {
                    id: toastId,
                });
                router.push('/')

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
                    <CardTitle>Login to you account</CardTitle>
                    <CardDescription>
                        Enter your  email , password below to login to your account
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
                            <form.Field name="email" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Email </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-1" type="Email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Email"
                                        >
                                        </Input>
                                        {
                                            isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)
                                        }
                                    </Field>
                                )
                            }} />
                            <form.Field name="password" children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Password </FieldLabel>
                                        <Input
                                            className="border-2 rounded-md p-1" type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Password"
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
                        Login
                    </Button>
                    <div>
                        Don't have an account <Link className="text-[#FBBF24] font-semibold" href="/signup">Register</Link>
                    </div>

                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;




