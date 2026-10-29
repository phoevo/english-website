"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { account } from "@/data/appwrite";
import AuthPanel from "@/components/auth/AuthPanel";
import AuthLoading from "@/components/auth/AuthLoading";
import styles from "@/components/auth/auth.module.css";

const formSchema = z.object({ email: z.string().email({ message: "Invalid email address" }) });

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      await account.createRecovery(values.email, `${window.location.origin}/reset-password`);
      setSuccess(true);
    } catch (err: unknown) {
      console.error("Password recovery error:", err);
      const message = err && typeof err === "object" && "message" in err && typeof (err as { message?: unknown }).message === "string"
        ? (err as { message: string }).message : "Failed to send recovery email. Please try again.";
      setError(message);
    } finally { setIsLoading(false); }
  }

  return <AuthPanel title={success ? "Check your email." : "Forgot your password?"} description={success ? "Follow the link in your email to choose a new password." : "Enter your email address and we’ll send you a reset link."}
    footer={!success && <>Remember your password? <Link href="/login">Log in</Link></>}>
    {success ? <div role="status" className={styles.success}>
      <p>If an account exists for this email, you will receive a password reset link shortly.</p>
      <Link href="/login" className={styles.button}>Back to log in</Link>
    </div> : <>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} aria-busy={isLoading} className={styles.form}>
          <fieldset disabled={isLoading} className={styles.fields}>
            <FormField control={form.control} name="email" render={({ field }) => <FormItem className={styles.field}>
              <FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl><FormMessage />
            </FormItem>} />
            <button type="submit" disabled={isLoading} aria-label={isLoading ? "loading" : undefined} aria-busy={isLoading} className={styles.button}>{isLoading ? <AuthLoading /> : "Send reset link"}</button>
          </fieldset>
        </form>
      </Form>
    </>}
  </AuthPanel>;
}
