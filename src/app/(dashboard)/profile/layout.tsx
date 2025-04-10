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
import { CreditCardIcon } from "lucide-react"
import { Geist } from "next/font/google";
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



const geist = Geist({ subsets: ['latin'] });

export default function profileLayout(){
  return (
    <div className={`flex justify-center items-center h-auto ${geist}`}>
    <Tabs defaultValue="account" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing">Billing and Payments</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Change your password here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <div className="gap"></div>
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
            pattern="d{4} d{4} d{4} d{4}"
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

    <Card className="bg-background mt-2">
    <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your Subscription</CardDescription>
      </CardHeader>
      <CardContent>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">Unsubscribe</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${geist.className}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will lose access to all extra features and will be put on the &quot;free&quot; plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go back</AlertDialogCancel>
          <AlertDialogAction>Unsubscribe</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      </CardContent>

    </Card>
      </TabsContent>

    </Tabs>
    </div>
  )
}
