'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

import { account } from '@/data/appwrite'
import { ID } from 'appwrite'
import { useState } from 'react'
import { ensureUserDocument } from '@/data/getData'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/data/useUserStore'


const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters long' })
      .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });


export default function Register() {
  const { fetchUser } = useUserStore.getState()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setIsLoading(true);
  setError(null);

  try {
    const user = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.username
    );
    console.log('✅ Account created:', user);
  } catch (err) {
    console.error('❌ Failed to create account:', err);
    setError('Failed to create account. Email may already be in use.');
    setIsLoading(false);
    return;
  }

  try {
    await account.createEmailPasswordSession(data.email, data.password);
    console.log('✅ Session created');
  } catch (err) {
    console.error('❌ Failed to create session:', err);
    setError('Account created, but failed to sign in. Try logging in manually.');
    setIsLoading(false);
    return;
  }

  try {
    await ensureUserDocument();
    console.log('✅ User document ensured');
  } catch (err) {
    console.error('⚠️ Failed to create user document:', err);
  }

  try {
    await fetchUser()  // <== Add this line to update Zustand user store
    console.log('✅ User store updated');
  } catch (err) {
    console.error('❌ Failed to fetch user for store:', err);
    setError('Something went wrong. Please try logging in again.');
    setIsLoading(false);
    return;
  }

  router.push('/onboarding');
};




  return (
    <div className="flex flex-col w-100 gap-10">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="YourUsername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
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

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
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
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </div>
  )
}
