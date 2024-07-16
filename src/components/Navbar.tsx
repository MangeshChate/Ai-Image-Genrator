
import Image from "next/image";
import logo from "../../public/logo.png";
import { Button } from './ui/button';
import Link from 'next/link';
const Navbar = () => {
  return (
    <div>
      <div className="container pt-5 pb-5 flex justify-between items-center">
        <Link href={"/"} className='flex items-center gap-3'>
         <Image src={logo} alt="logo.png" width="50" height="50"/>
          <span className='font-bold text-2xl'>PurpleAi</span>
        </Link>
        <div className='hidden sm:hidden md:block lg:block'>
          <ul className='flex gap-10 '>
            <Link href="/">Home</Link>
            <li>Explore</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='flex gap-4'>
          <Button className='hidden sm:hidden md:hidden lg:block'>Login</Button>
          <Link href={"/dashboard"}>
          <Button className='bg-transparent border-2 rounded-lg border-purple-800'>Lets Genrate</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

