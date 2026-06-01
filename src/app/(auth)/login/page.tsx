'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {CardContent,CardDescription,CardHeader,CardTitle,} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { account } from '@/data/appwrite'
import { ensureUserDocument } from '@/data/getData'
import { OAuthProvider } from 'appwrite'
import Image from 'next/image'

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

  const handleGoogleLogin = () => {
    try {
      account.createOAuth2Token(
        OAuthProvider.Google,
        `${window.location.origin}/oauth-callback?redirect=/home`,
        `${window.location.origin}/login`
      );
    } catch (error: unknown) {
      console.error('Google login error:', error)
      setFormError('Failed to authenticate with Google.')
    }
  }


  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get()
        router.replace('/home')
      } catch {
      }
    }

    checkSession()
  }, [router])

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)

useEffect(() => {
  const checkSession = async () => {
    try {
      await account.get()
      router.replace('/home')
    } catch {
      setCheckingSession(false)
    }
  }

  checkSession()
}, [router])

if (checkingSession) {
  return null
}

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFormError(null);

    try {

      try {
        await account.get(); // succeeds if logged in
        await account.deleteSession('current'); // log out
      } catch {
      }

      await account.createEmailPasswordSession(data.email, data.password);

      // Store JWT token for function calls
      const jwt = await account.createJWT();
      localStorage.setItem('jwt', jwt.jwt);

      await ensureUserDocument();
      router.push('/home');

    } catch (error: unknown) {
      console.error('Login error:', error);
      const err = (error ?? {}) as { code?: number; message?: string };
      if (typeof err.code === 'number' && err.code === 429) {
        setFormError("Too many login attempts. Please wait a moment and try again.");
      } else if (typeof err.message === 'string') {
        setFormError(err.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className="flex flex-col w-full lg:w-full gap-10">
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
              {formError && (
                <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
                  {formError}
                </div>
              )}

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

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <Button onClick={handleGoogleLogin} variant="outline" type='button' className="w-full cursor-pointer" disabled={isLoading}>
                <Image alt='Google logo' src='google-logo.svg' height={20} width={"20"}/>
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
