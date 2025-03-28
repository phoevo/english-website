import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./button";


async function Navbar() {

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-18">
          <div className="flex items-center gap-20">

          <Link href={"/"} className="text-3xl font-light absolute left-10">Synomilo</Link>
            <Link href="/home" className="text-xl font-bold text-primary font-mono tracking-wider hover:underline underline-offset-10 decoration-zinc-600">
              home
            </Link>
            <Link href="/profile" className="text-xl font-bold text-primary font-mono tracking-wider hover:underline underline-offset-10 decoration-zinc-600">
              profile
            </Link>
            <div className="flex items-center gap-5 absolute right-10"><ModeToggle/>
            <Link href={"/login"}><Button className="cursor-pointer" variant="outline">Log in</Button>
            </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;