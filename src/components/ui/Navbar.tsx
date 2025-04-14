"use client"

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./button";
import { Badge } from "./badge";
import { account } from '@/data/appwrite'; // Ensure you're importing Appwrite instance
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the type of user (optional, depending on how Appwrite returns the user data)
interface User {
  $id: string;
  name: string;
  email: string;
  // Include other fields you expect from the Appwrite user object
}

const Navbar = () => {
  // State to store the logged-in user or null if not logged in
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Function to check the user session asynchronously
  const checkUserSession = async (): Promise<void> => {
    try {
      const currentUser = await account.get(); // Fetch current user
      setUser(currentUser); // Set the user state with the data from Appwrite
      console.log(currentUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUser(null); // If an error occurs, set the user to null (not logged in)
    }
  };

  // useEffect to check session on component mount
  useEffect(() => {
    checkUserSession(); // Call async function to check user session
  }, []); // Empty array means it runs once when the component mounts

  // Function to handle logout
  const handleLogout = async (): Promise<void> => {
    try {
      await account.deleteSession('current'); // Delete current session
      setUser(null); // Update state to null after logout
      router.push('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error("Error logging out:", err); // Handle logout error
    }
  };

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



            <div className="flex items-center gap-5 absolute right-10">

            {user &&
            <div>Hello, {user.name}</div>
            }

              <Badge>Free</Badge>

              {/* Conditionally render login or logout button based on user state */}
              {user ? (
                <Button className="cursor-pointer" onClick={handleLogout} variant="outline">Logout</Button>
              ) : (
                <Link href={"/login"}>
                  <Button className="cursor-pointer" variant="outline">Log in</Button>
                </Link>
              )}

              <ModeToggle />
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
