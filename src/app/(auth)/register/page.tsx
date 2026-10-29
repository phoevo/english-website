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
import AuthPanel from '@/components/auth/AuthPanel'
import AuthLoading from '@/components/auth/AuthLoading'
import styles from '@/components/auth/auth.module.css'


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
  const pending = isLoading;

  const handleGoogleSignup = async () => {
    if (pending) return;

    setError(null);
    try {
      await account.createOAuth2Token(
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
  if (pending) return;
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
  } catch (err) {
    console.error('Account setup failed:', err);
    setError('Your account was created, but setup could not finish. Please log in to try again.');
    setIsLoading(false);
    return;
  }


  try {
    await sendWelcomeEmail({ userEmail: data.email, userName: data.username });
  } catch (err) {
    console.warn('Welcome email failed (non-blocking):', err);
  }

  try {
    await fetchUser()
    if (!useUserStore.getState().user) throw new Error('User could not be loaded');
  } catch {
    setError('Something went wrong. Please try logging in again.');
    setIsLoading(false);
    return;
  }
  router.replace('/home');
};




  return <AuthPanel title="Create an account." description="Sign up with Google or use your email." footer={<>Already have an account? <Link href="/login">Log in</Link></>}>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <button type="button" onClick={handleGoogleSignup} disabled={pending} className={styles.googleButton}>
      <Image src="/google-logo.svg" alt="" width={18} height={18} />Continue with Google
    </button>
    <div className={styles.divider}>or use email</div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-busy={pending} className={styles.form}>
        <fieldset disabled={pending} className={styles.fields}>
          <FormField control={form.control} name="username" render={({ field }) => <FormItem className={styles.field}>
            <FormLabel>Username</FormLabel><FormControl><Input placeholder="Your username" autoComplete="username" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <FormField control={form.control} name="email" render={({ field }) => <FormItem className={styles.field}>
            <FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <FormField control={form.control} name="password" render={({ field }) => <FormItem className={styles.field}>
            <FormLabel>Password</FormLabel><FormControl><PasswordInput placeholder="Create a password" autoComplete="new-password" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <FormField control={form.control} name="confirmPassword" render={({ field }) => <FormItem className={styles.field}>
            <FormLabel>Confirm password</FormLabel><FormControl><PasswordInput placeholder="Repeat your password" autoComplete="new-password" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <p className={styles.terms}>By signing up, you agree to the <Link href="/ToS">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
          <button type="submit" disabled={pending} aria-label={isLoading ? "loading" : undefined} aria-busy={isLoading} className={styles.button}>{isLoading ? <AuthLoading /> : "Create account"}</button>
        </fieldset>
      </form>
    </Form>
  </AuthPanel>;
}
