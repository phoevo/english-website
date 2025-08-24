'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState } from 'react'

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
import { account } from '@/data/appwrite'
import { Client, Functions } from 'appwrite'

// Schema for email validation
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function ForgetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const redirectUrl = `${window.location.origin}/reset-password` // This page consumes userId & secret
      await account.createRecovery(values.email, redirectUrl)

      // Fire-and-forget: send a courtesy notice via our public function route via Appwrite Functions API
      try {
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

        const client = new Client().setEndpoint(endpoint).setProject(projectId);
        const functions = new Functions(client);

        await functions.createExecution(
          '68794e830018a53dcad6', // Function ID
          JSON.stringify({ email: values.email }),
          false,
          '/send-reset-notice',
          'POST',
          { 'content-type': 'application/json' }
        );
      } catch (noticeErr) {
        console.warn('Optional reset notice email failed (non-blocking):', noticeErr);
      }

      setSuccess(true)
    } catch (err: any) {
      console.error('Password recovery error:', err)
      setError(err?.message || 'Failed to send recovery email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-100 gap-10">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If an account exists for this email, you will receive a password reset link shortly.
              </p>
              <Link href="/login">
                <Button className="w-full cursor-pointer">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  {error && (
                    <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">{error}</div>
                  )}
                  {/* Email Field */}
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
                  <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                  <div className='flex flex-row justify-evenly text-sm mt-10'>
                    <Link href="/login" className="underline cursor-pointer">
                      Login
                    </Link>
                    <Link href="/register" className="underline cursor-pointer">
                      Sign up
                    </Link>

                  </div>
                </div>
              </form>

            </Form>
          )}

        </CardContent>
    </div>
  )
}



