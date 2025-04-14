'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation' // For redirecting after login

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { account } from '@/data/appwrite' // Import Appwrite's account API

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  // Handle login submission
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Call Appwrite's createEmailPasswordSession method with the user's email and password
      await account.createEmailPasswordSession(data.email, data.password)

      // If login is successful, redirect to the home page or user profile
      router.push('/home') // You can redirect to another page as per your requirement
    } catch (error) {
      // Handle login error (e.g., invalid credentials)
      console.error('Login error:', error)
      // Optionally, you can show an error message to the user here
    }
  }

  return (
    <div className="flex flex-col w-100 gap-10">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="john@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                    </div>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="justify-center items-center flex flex-col mt-4 text-sm mt-20">
          <Link href="/forgot-password" className="text-sm underline">
            Forgot your password?
          </Link>
          <p className="inline-flex mt-5">
            Don&apos;t have an account?&nbsp;
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </div>
  )
}
