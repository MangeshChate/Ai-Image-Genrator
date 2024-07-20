"use client"
import Spline from '@splinetool/react-spline';
import Histroy from "@/components/Histroy"
import Navbar from "@/components/Navbar"
import '../app/globals.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import app from '../../config';

const Profile = () => {
    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);
  
    const handleAuthChange = useCallback((user: any | null) => {
      if (user) {
        setUser(user);
      } 
    }, [router]);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
      return () => unsubscribe();
    }, [auth, handleAuthChange]);
  
    return (
        <div>
            <Navbar user={user}/>
           
            <div className=" p-5 mt-10 container ">
                <div className=" lg:mb-10 flex flex-wrap">

                    <span className=" text-5xl lg:text-7xl lg:p-3 p-0 font-bold">
                        Welcome, Mangesh Chate
                    </span>

                    <span className="hidden lg:block md:block p-3 text-sm  lg:text-3xl underline">Easy to create, Safe to use.  Licensed.</span>
                </div>

                <div className="">
                    <Histroy userInfo={user}/>
                </div>
            </div>
        </div>
    )
}

export default Profile
