'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { account, databases, databaseId, usersCollectionId } from '@/data/appwrite'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { CreditCardIcon, Loader2 } from "lucide-react"
import { Geist } from "next/font/google"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { unsubscribeUser } from '@/data/getData'
import Link from 'next/link'
import CustomColors from './CustomColors'




const geist = Geist({ subsets: ['latin'] })

const Spinner = () => (
  <div className="flex flex-col gap-10 justify-center items-center py-10">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)


export default function ProfileLayout() {
  const [user, setUser] = useState<any>(null)
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const [username, setUsername] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false);




  const accountFormSchema = z.object({
    username: z.string().min(2, { message: 'Username is too short. Requires at least 2 characters' }),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  }).refine(
    (data) =>
      !data.newPassword || (data.newPassword && data.currentPassword),
    {
      message: 'Current password is required to change password',
      path: ['currentPassword'],
    }
  )

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: '',
      currentPassword: '',
      newPassword: '',
    },
  })



  const onAccountSubmit = async (values: z.infer<typeof accountFormSchema>) => {
    setFormError(null)
    setIsSaving(true)

    try {
      if (
        values.username === user?.name &&
        !values.newPassword
      ) {
        toast('No changes detected', {
          description: 'Please update your username or password before saving.',
        })
        setIsSaving(false)
        return
      }

      if (values.username !== user?.name) {
        await account.updateName(values.username)
        toast('Username updated', {
          description: `Your username is now ${values.username}`,
        })
      }

      if (values.newPassword) {
        await account.updatePassword(values.newPassword, values.currentPassword)
        toast('Password updated', {
          description: 'Your password has been changed successfully.',
        })
        accountForm.resetField('currentPassword')
        accountForm.resetField('newPassword')
      }

      const updatedUser = await account.get()
      setUser(updatedUser)


    } catch (err: any) {
      console.error('Update error:', err)
      setFormError(err?.message || 'Failed to update profile.')
      toast('Error', {
        description: err?.message || 'Failed to update profile.',
      })
    } finally {
      setIsSaving(false)
    }
  }




  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get()
        setUser(currentUser)
        setUsername(currentUser.name)
        accountForm.setValue('username', currentUser.name)
        accountForm.setValue("newPassword", "")
        accountForm.setValue("currentPassword", "")
      } catch {
        setUser(null)
      } finally {
        setIsCheckingUser(false)
      }
    }

    checkUser()
  }, [])



  useEffect(() => {
    const fetchUser = async () => {
      const user = await account.get();
      setUser(user);

      const doc = await databases.getDocument(databaseId, usersCollectionId, user.$id);
      setIsSubscribed(doc.isSubscribed);
    };

    fetchUser();
  }, []);


  const handleUnsubscribe = async () => {
    if (!user) {
      console.log('No user found, exiting unsubscribe.');
      return; // If no user exists, we stop.
    }

    console.log('Attempting to unsubscribe user with ID:', user.$id);

    try {
      // Call the unsubscribe function
      const unsubscribeResponse = await unsubscribeUser(user.$id);
      console.log('Unsubscribe response:', unsubscribeResponse);

      // Update subscription state
      setIsSubscribed(false);
      console.log('Updated subscription state to false');

      // Trigger success toast
      toast.success('You have successfully unsubscribed!', {
        description: 'You will no longer have access to premium content.',
      });
      console.log('Toast triggered: Unsubscribed successfully');
    } catch (error) {
      console.error('Unsubscription failed:', error);

      // Show error toast in case of failure
      toast.error('Unsubscription failed. Please try again later.', {
        description: 'We encountered an error while processing your request.',
      });
    }
  };


console.log(isSubscribed);


  return (
    <main className={`flex justify-center items-center h-auto pt-5 ${geist.className}`}>
      <Tabs defaultValue="account" className="w-full max-w-md md:max-w-xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing and Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
        <div>
      <Toaster />
    </div>
  <Card className="bg-background">
    {isCheckingUser ? (
      <Spinner />
    ) : user ? (
      <>

        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...accountForm}>
            <form
              onSubmit={accountForm.handleSubmit(onAccountSubmit)}
              className="space-y-6"
            >
              {formError && (
                <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
                  {formError}
                </div>
              )}

              <FormField
                control={accountForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourname"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </>
    ) : (
      <p className="text-md text-center py-6">
        Create an account or log in to access your account.
      </p>
    )}
  </Card>
</TabsContent>





        <TabsContent className='flex flex-col gap-2' value="settings">

            <Card className='bg-background'>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="space-y-1">
                <Label htmlFor="toggle" className='mb-5'>Color customization</Label>
                {user && <CustomColors/>}
                </div>





            </CardContent>

          </Card>

        </TabsContent>









        <TabsContent value="billing">
        <div>
      <Toaster />
    </div>
  {isCheckingUser ? (
    <Spinner />
  ) : user ? (
    <div className="flex flex-col gap-2">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Credit Card</CardTitle>
          <CardDescription>Update your payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <CreditCardIcon className="h-8 w-8 text-primary" />
            <Input
              id="card-number"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              pattern="\d{4} \d{4} \d{4} \d{4}"
              className="flex-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiration">Expiration</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger id="expiration-month">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger id="expiration-year">
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 2023).map((year) => (
                      <SelectItem key={year} value={year.toString().slice(2)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" type="text" placeholder="123" maxLength={3} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Update
          </Button>
        </CardFooter>
      </Card>

     <Card className="bg-background">
  <CardHeader>
    <CardTitle>Subscription</CardTitle>
    <CardDescription>Manage your Subscription</CardDescription>
  </CardHeader>
  <CardContent>
    <AlertDialog>
      {isSubscribed ? (
        <AlertDialogTrigger asChild>
          <div className="flex items-center gap-2">
            <Button variant="destructive" className='cursor-pointer'>Unsubscribe</Button>
          </div>
        </AlertDialogTrigger>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="destructive" disabled className="cursor-pointer">
            Unsubscribe
          </Button>
          <Link className="underline cursor-pointer text-sm" href="/subscribe">
            Subscribe?
          </Link>
        </div>
      )}

      <AlertDialogContent className={geist.className}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will lose access to all extra features and will be put on the free plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>Go back</AlertDialogCancel>
          <a href="/home">
            <AlertDialogAction className='cursor-pointer' onClick={handleUnsubscribe}>
              Unsubscribe
            </AlertDialogAction>
          </a>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </CardContent>
</Card>

    </div>
  ) : (
    <Card className="bg-background">
      <CardContent>
        <p className="text-md text-center py-6">
          Create an account or log in to access your billing.
        </p>
      </CardContent>
    </Card>
  )}
</TabsContent>

</Tabs>
    </main>
  )
}
