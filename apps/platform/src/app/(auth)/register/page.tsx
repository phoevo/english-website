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
import { OAuthProvider } from 'appwrite'
import { useState } from 'react'
import { ensureUserDocument } from '@/data/getData'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/data/useUserStore'
import { sendWelcomeEmail } from '@/services/emailService'
import Image from 'next/image'


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

  const handleGoogleSignup = () => {
    try {
      account.createOAuth2Token(
        OAuthProvider.Google,
        `${window.location.origin}/oauth-callback`,
        `${window.location.origin}/register`
      );
    } catch (e: unknown) {
      console.error('Google signup error:', e);
      setError('Failed to authenticate with Google.');
    }

  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setIsLoading(true);
  setError(null);

  try {
    await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.username
    );
  } catch {
    setError('Failed to create account. Email may already be in use.');
    setIsLoading(false);
    return;
  }

  try {
    await account.createEmailPasswordSession(data.email, data.password);
  } catch {
    setError('Account created, but failed to sign in. Try logging in manually.');
    setIsLoading(false);
    return;
  }


  try {
    const jwt = await account.createJWT();
    localStorage.setItem('jwt', jwt.jwt);
  } catch {
  }

  try {
    await ensureUserDocument();
  } catch {
  }


  try {
    await sendWelcomeEmail({ userEmail: data.email, userName: data.username });
  } catch (err) {
    console.warn('Welcome email failed (non-blocking):', err);
  }

  try {
    await fetchUser()
  } catch {
    setError('Something went wrong. Please try logging in again.');
    setIsLoading(false);
    return;
  }
  router.push('/onboarding');
};




  return (
    <div className="flex flex-col w-full lg:full gap-10">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Sign up with Google or create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleGoogleSignup} variant="outline" type="button" className="flex w-full cursor-pointer" disabled={isLoading}>
          <Image alt="Google logo" src='google-logo.svg' width={20} height={20}/>
          Continue with Google
        </Button>

        <div className='flex justify-center my-5 text-muted-foreground'>
          <p>or</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="user@mail.com"
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="*********"
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
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="*********"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex flex-row items-center justify-center my-2 space-x-3">
                <FormLabel className="flex text-sm font-normal">
                  By signing up, you agree to the
                  <Link href="/ToS" className="underline">Terms of Service</Link>
                  and
                  <Link href="/privacy" className="underline">Privacy Policy</Link>
                </FormLabel>
              </div>

              <div className='flex flex-col gap-2 items-center justify-center'>
              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>


              </div>
            </div>
          </form>
        </Form>

        <div className="mt-5 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </div>
  )
}
