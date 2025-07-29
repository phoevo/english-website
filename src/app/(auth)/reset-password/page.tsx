'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {CardContent,CardDescription,CardHeader,CardTitle,} from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { account } from '@/data/appwrite'

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [userId, setUserId] = useState('')
  const [secret, setSecret] = useState('')
  const [isValidLink, setIsValidLink] = useState(false)

  useEffect(() => {
    // Get userId and secret from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('userId');
    const secretParam = urlParams.get('secret');
    
    if (userIdParam && secretParam) {
      setUserId(userIdParam);
      setSecret(secretParam);
      setIsValidLink(true);
    } else {
      setFormError('Invalid or expired reset link');
    }
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!isValidLink) {
      setFormError('Invalid reset link');
      return;
    }

    setIsLoading(true);
    setFormError(null);

    try {
      await account.updateRecovery(
        userId,
        secret,
        data.password,
        data.confirmPassword
      );
      setSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error?.message) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col w-100 gap-10">
        <CardHeader>
          <CardTitle className="text-2xl">Password Reset Successfully</CardTitle>
          <CardDescription>
            Your password has been updated successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You can now log in with your new password.
            </p>
            <Button onClick={() => router.push('/login')} className="w-full cursor-pointer">
              Go to Login
            </Button>
          </div>
        </CardContent>
      </div>
    )
  }

  if (!isValidLink) {
    return (
      <div className="flex flex-col w-100 gap-10">
        <CardHeader>
          <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please request a new password reset link.
            </p>
            <Link href="/forgot-password">
              <Button className="w-full cursor-pointer">
                Request New Reset Link
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-100 gap-10">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {formError && (
                <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
                  {formError}
                </div>
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="******"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </Form>

        <div className="justify-center items-center flex flex-col mt-4 text-sm mt-20">
          <Link href="/login" className="text-sm underline">
            Back to Login
          </Link>
        </div>
      </CardContent>
    </div>
  )
}
