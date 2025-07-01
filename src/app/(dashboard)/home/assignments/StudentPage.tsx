import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function StudentPage() {
  return (
    <div className=''>
       <Card className='bg-background'>
        <CardHeader>
          <CardTitle>My Assigned Tasks</CardTitle>
          <CardDescription>Your assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Card className='bg-background'>
        <CardHeader>
          <CardTitle>My Teachers</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>


    </div>
  )
}

export default StudentPage
