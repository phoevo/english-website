import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForgotPassword(){
  return(
    <>
    <h1>Forgot Password</h1>

    <Link href={"/login"}>
    <Button>Log in</Button>
    </Link>

    <Link href={"/register"}>
    <Button>register</Button>
    </Link>

    </>


  )
}