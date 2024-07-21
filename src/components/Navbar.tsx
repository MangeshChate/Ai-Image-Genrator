"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import { Button } from './ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { HelpCircle, Link2, LogOut, Settings, User } from "lucide-react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";

type PropType = {
  user: any
}

const Navbar: React.FC<PropType> = ({ user }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [fallback, setFallback] = useState<string>('');

  useEffect(() => {

    if (user?.displayName) {
      setFallback(user.displayName.slice(0, 2));
    }
  }, [user?.displayName]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error: any) {

      console.error(error.message);
    }
  };





  return (
    <div>
      <div className="container pt-5 pb-5 flex justify-between items-center">
        <Link href={"/"} className='flex items-center gap-3'>
          <Image src={logo} alt="logo.png" width="50" height="50" />
          <span className='font-bold text-2xl'>PurpleAi</span>
        </Link>
        <div className='hidden sm:hidden md:block lg:block'>
          <ul className='flex gap-10 '>
            <li key="home"><Link href="/">Home</Link></li>
            <li key="explore"><Link href="/explore">Explore</Link></li>
            <li key="contact">
              <Link href="https://mangeshchate.netlify.app/" target="_blank">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex gap-4'>


          <Link href={"/dashboard"} className="hidden md:block sm:hidden lg:block">
            <Button className='bg-transparent border-2 rounded-lg border-purple-800'>Let's Generate</Button>
          </Link>


          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>
                      {fallback}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/profile"}>
                    <DropdownMenuItem className="cursor-pointer py-5">
                      <User className="mr-2 h-4 w-4" />
                      <span>
                        {user ? <span className="truncate">{user?.displayName}</span> : <>Profile</>}
                      </span>

                    </DropdownMenuItem>
                  </Link>
                  <Link href="https://mangeshchate.netlify.app/" target="_blank">
                    <DropdownMenuItem className="cursor-pointer py-5">
                      <Link2 className="mr-2 h-4 w-4" />
                      <span>About</span>

                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem className="cursor-pointer py-5">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>

                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4 text-red-500 " />
                    <span className="text-red-500">Log Out</span>

                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Link href="/signin">
                <Button className='hidden sm:hidden md:hidden lg:block'>Login</Button>
              </Link>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Navbar;
