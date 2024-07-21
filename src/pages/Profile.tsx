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
  console.log(user)
    return (
        <div>
            <Navbar user={user}/>
           
            <div className=" p-5 mt-10 container ">
                <div className=" lg:mb-10 flex flex-wrap">

                    <span className=" lg:p-3 p-0  justify-center flex w-full flex-col items-center">
                        <img src={user?.photoURL} alt="profile_picture" className='rounded-full border-4 border-purple-600 lg:w-[150px]' />
                        <span className='mt-3 font-bold text-xl lg:text-2xl'>{user?.displayName}</span>
                        <span className="text-secondary text-purple-400">{user?.email}</span>
                    </span>

                    
                </div>

                <div className="">
                    <Histroy userInfo={user}/>
                </div>
            </div>
        </div>
    )
}

export default Profile
