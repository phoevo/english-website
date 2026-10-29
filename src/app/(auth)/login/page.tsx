"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OAuthProvider } from "appwrite";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { account } from "@/data/appwrite";
import { ensureUserDocument } from "@/data/getData";
import AuthPanel from "@/components/auth/AuthPanel";
import AuthLoading from "@/components/auth/AuthLoading";
import styles from "@/components/auth/auth.module.css";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: "", password: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const pending = isLoading;

  useEffect(() => {
    let cancelled = false;
    const checkSession = async () => {
      try { await account.get(); if (!cancelled) router.replace("/home"); }
      catch { if (!cancelled) setCheckingSession(false); }
    };
    void checkSession();
    return () => { cancelled = true; };
  }, [router]);

  async function handleGoogleLogin() {
    if (pending) return;

    setFormError(null);
    try {
      await account.createOAuth2Token(OAuthProvider.Google, `${window.location.origin}/oauth-callback`, `${window.location.origin}/login`);
    } catch (error) {
      console.error("Google login error:", error);
      setFormError("Failed to authenticate with Google.");

    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (pending) return;
    setIsLoading(true);
    setFormError(null);
    try {
      try { await account.get(); await account.deleteSession("current"); } catch {}
      await account.createEmailPasswordSession(data.email, data.password);
      const jwt = await account.createJWT();
      localStorage.setItem("jwt", jwt.jwt);
      await ensureUserDocument();
      router.push("/home");
    } catch (error: unknown) {
      console.error("Login error:", error);
      const err = (error ?? {}) as { code?: number; message?: string };
      setFormError(err.code === 429 ? "Too many login attempts. Please wait a moment and try again." : typeof err.message === "string" ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  if (checkingSession) return <div className={styles.pending}><AuthLoading /></div>;

  return <AuthPanel title="Log in." description="Enter your email and password to access your account." footer={<>Don’t have an account? <Link href="/register">Sign up</Link></>}>
    {formError && <p role="alert" className={styles.error}>{formError}</p>}
    <button type="button" onClick={handleGoogleLogin} disabled={pending} className={styles.googleButton}>
      <Image src="/google-logo.svg" alt="" width={18} height={18} />Continue with Google
    </button>
    <div className={styles.divider}>or use email</div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-busy={pending} className={styles.form}>
        <fieldset disabled={pending} className={styles.fields}>
          <FormField control={form.control} name="email" render={({ field }) => <FormItem className={styles.field}>
            <FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <FormField control={form.control} name="password" render={({ field }) => <FormItem className={styles.field}>
            <div className={styles.passwordLabel}><FormLabel>Password</FormLabel><Link href="/forgot-password">Forgot password?</Link></div>
            <FormControl><PasswordInput placeholder="Your password" autoComplete="current-password" {...field} /></FormControl><FormMessage />
          </FormItem>} />
          <button type="submit" disabled={pending} aria-label={isLoading ? "loading" : undefined} aria-busy={isLoading} className={styles.button}>{isLoading ? <AuthLoading /> : "Log in"}</button>
        </fieldset>
      </form>
    </Form>
  </AuthPanel>;
}
