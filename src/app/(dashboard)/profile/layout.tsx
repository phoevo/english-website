'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { account, databases, databaseId, usersCollectionId, decksCollectionId, friendRequestsId, assignmentsId } from '@/data/appwrite'
import { useUserStore } from '@/data/useUserStore'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { Label } from '@/components/ui/label'
import CustomColors from './CustomColors'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { unsubscribeUser2, deleteAccountServer } from '@/data/getData'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Query } from 'appwrite'

const geist = Geist({ subsets: ['latin'] });


const Spinner = () => (
  <div className="flex flex-col gap-10 justify-center items-center py-10">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

const accountFormSchema = z.object({
  username: z.string().min(2, { message: 'Username is too short. Requires at least 2 characters' }),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

export default function ProfileLayout() {
  const { user, fetchUser, setSubscribed, isSubscribed, setUser } = useUserStore();
  const router = useRouter();

  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Deletion dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canConfirmDelete = confirmText.trim().toLowerCase() === "delete";

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: user?.name ?? '',
      currentPassword: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      accountForm.reset({
        username: user.name,
        currentPassword: '',
        newPassword: '',
      });
    }
  }, [user, accountForm]);

  useEffect(() => {
    async function loadUser() {
      setIsCheckingUser(true);
      try {
        await fetchUser();
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsCheckingUser(false);
      }
    }
    loadUser();
  }, [fetchUser]);

  const onAccountSubmit = async (values: z.infer<typeof accountFormSchema>) => {
    setFormError(null);
    setIsSaving(true);

    try {
      if (
        values.username === user?.name &&
        !values.newPassword) {
        toast('No changes detected', {
          description: 'Please update your username, role, or password before saving.',
        });
        setIsSaving(false);
        return;
      }

      if (values.username !== user?.name) {
        await account.updateName(values.username);
        toast('Username updated', {
          description: `Your username is now ${values.username}`,
        });
      }

      if (values.newPassword) {
        await account.updatePassword(values.newPassword, values.currentPassword);
        toast('Password updated', {
          description: 'Your password has been changed successfully.',
        });
        accountForm.resetField('currentPassword');
        accountForm.resetField('newPassword');
      }

      const updatedUser = await account.get();
      setUser({
        $id: updatedUser.$id,
        name: updatedUser.name,
        email: updatedUser.email,
        isSubscribed: user?.isSubscribed ?? false,
        isTeacher: user?.isTeacher ?? false,
      });

    } catch (err: unknown) {
      console.error('Update error:', err);
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message: string }).message
          : 'Failed to update profile.';
      setFormError(message);
      toast('Error', {
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };



const handleUnsubscribe = async () => {
  if (!user) {
    console.log('No user found, exiting unsubscribe.');
    return;
  }

  console.log('Attempting to unsubscribe user with ID:', user.$id);

  try {
    const unsubscribeResponse = await unsubscribeUser2(user.$id);
    console.log('Unsubscribe response:', unsubscribeResponse);

    setSubscribed(false);
    await fetchUser();

    toast.success('You have successfully unsubscribed!', {
      description: 'You will no longer have access to premium content.',
    });

  } catch (error) {
    console.error('Unsubscription failed:', error);

    toast.error('Unsubscription failed. Please try again later.', {
      description: 'We encountered an error while processing your request.',
    });
  }
};



  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);

    const userId = user.$id;

    const safeDeleteDocs = async (
      collectionId: string,
      queries: string[]
    ) => {
      try {
        const res = await databases.listDocuments(databaseId, collectionId, queries);
        for (const doc of (res.documents as Array<{ $id: string }>)) {
          try {
            await databases.deleteDocument(databaseId, collectionId, doc.$id);
          } catch (e) {
            console.warn(`Failed to delete doc ${doc.$id} in ${collectionId}:`, e);
          }
        }
      } catch (e) {
        console.warn(`Failed to list documents in ${collectionId}:`, e);
      }
    };

    try {
      try {
        await unsubscribeUser2(userId);
      } catch (e) {
        console.warn('Unsubscribe step failed or not applicable:', e);
      }

      await safeDeleteDocs(decksCollectionId, [Query.equal('userID', userId)]);

      await safeDeleteDocs(friendRequestsId, [Query.equal('fromUserId', userId)]);
      await safeDeleteDocs(friendRequestsId, [Query.equal('toUserId', userId)]);

      await safeDeleteDocs(assignmentsId, [Query.equal('studentId', userId)]);
      await safeDeleteDocs(assignmentsId, [Query.equal('teacherId', userId)]);

      try {
        await databases.deleteDocument(databaseId, usersCollectionId, userId);
      } catch (e) {
        console.warn('Failed to delete user document:', e);
      }

      try {
        await deleteAccountServer();
      } catch (e) {
        console.warn('Failed to delete Appwrite auth user:', e);
      }

      try {
        await account.deleteSessions();
      } catch (e) {
        console.warn('Failed to delete sessions:', e);
      }

      toast.success('Your account has been deleted', {
        description: 'We removed your data and ended your session.',
      });

      try {
        localStorage.removeItem('jwt');
      } catch {}
      router.replace('/login');

    } catch (err: unknown) {
      console.error('Account deletion error:', err);
      toast.error('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setConfirmText("");
      setDeleteDialogOpen(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-auto pt-5">
      <Toaster />
      <Tabs defaultValue="account" className="w-full max-w-md md:max-w-xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing and Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="account">

            {isCheckingUser ? (
              <Spinner />
            ) : user ? (
              <>
          <Card className="bg-background">
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you&apos;re done.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...accountForm}>
                    <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                      {formError && (
                        <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
                          {formError}
                        </div>
                      )}

                      <div className='border-b pb-6'>
                      <FormField
                        control={accountForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Change Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      </div>

                      <FormField
                        control={accountForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Change Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter current password"
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
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSaving} className="cursor-pointer">
                        {isSaving ? 'Saving...' : 'Save changes'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>


          </Card>


          <Card className='bg-background mt-2'>
            <CardHeader>
              <CardTitle>Account Deletion</CardTitle>
              <CardDescription>Delete your account, subscription, progress, everything. You were never here.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => { setDeleteDialogOpen(open); if (!open) setConfirmText(""); }}>
                <AlertDialogTrigger asChild>
                  <Button variant={'destructive'} className="cursor-pointer" disabled={isDeleting}>
                    {isDeleting ? 'Deleting…' : 'Delete account'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className={geist.className}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm account deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action is permanent. It will delete your account and associated data (including subscription status and progress). To confirm, type &quot;delete&quot; below.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-delete" className="text-sm">Type &quot;delete&quot; to confirm</Label>
                    <Input
                      id="confirm-delete"
                      placeholder="delete"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                    />
                    {!canConfirmDelete && confirmText.length > 0 && (
                      <p className="text-xs text-muted-foreground">Please type exactly: delete</p>
                    )}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Go back</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      className="cursor-pointer"
                      disabled={!canConfirmDelete || isDeleting}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!canConfirmDelete || isDeleting) return;
                        await handleDeleteAccount();
                      }}
                    >
                      {isDeleting ? 'Deleting…' : 'Delete account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>

          </Card>
          </>
          ) : (
              <p className="text-md text-center py-6">
                Create an account or log in to access your account.
              </p>
            )}
        </TabsContent>









        <TabsContent className='flex flex-col gap-2' value="settings">

            <Card className='bg-background'>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
          <div className="space-y-0">

                <Label className="font-medium mb-2"> Highlight Color Customization
                  </Label>

                  {isSubscribed && user ?(
                  <>
                  <p className='text-sm text-muted-foreground'>Select a word type and select it&apos;s color. Save when you&apos;re done. <span className='text-red-500 font-normal m-0 text-sm'>
                    Certain background and text color combinations could make reading harder.</span>
                    </p>

                  <CustomColors userId={user.$id} />

                  </>):
                    <p className='text-muted-foreground text-sm'>Requires subscription</p>
                  }
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
      {/* <Card className="bg-background">
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
      </Card> */}

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

            <AlertDialogAction
              className="cursor-pointer"
              onClick={async () => {
                await handleUnsubscribe();
                 // Only navigate AFTER unsubscribing
              }}
            >
              Unsubscribe
            </AlertDialogAction>

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
