import Link from "next/link";
import ModeToggle from "./ModeToggle";


async function Navbar() {

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-18">
          <div className="flex items-center gap-20">
          <Link href={"/"} className="text-3xl font-light absolute left-10">Synomilo</Link>
            <Link href="/home" className="text-xl font-bold text-primary font-mono tracking-wider">
              home
            </Link>
            <Link href="/profile" className="text-xl font-bold text-primary font-mono tracking-wider">
              profile
            </Link>
            <div><ModeToggle/> </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;