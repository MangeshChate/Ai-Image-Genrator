'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../config';
import { setSession } from '../services/apiService'; 
import toast from 'react-hot-toast';

const SignIn = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const router = useRouter();
    
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        setLoading(true); 
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                
                const sessionData = {
                    lastLogin: new Date().toISOString(),
                    
                };

                
                await setSession(user.uid, sessionData);
                toast.success("session saved !")

                router.push('/dashboard'); 
            }
        } catch (error: any) {
            console.error("Error signing in with Google", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-[100vh]' style={{ backgroundImage: `url('/bg.jpg')`, backgroundPosition: "bottom", backgroundSize: 'cover' }}>
            <div className="w-full h-full black-morphism p-5">
                <div className='container'>
                    <Link href="/" className='flex items-center gap-3'>
                        <Image src="/logo.png" alt="logo.png" width={50} height={50} />
                        <span className='font-bold text-2xl'>PurpleAi</span>
                    </Link>
                </div>

                <div className='h-full w-full flex justify-center items-center'>
                    <div className="grid lg:grid-cols-2 grid-cols-1 bg-[#030712] p-5 rounded-xl">
                        <div className='hidden lg:block md:block'>
                            <Image src="/login.webp" alt="login-img" width={500} height={500} className='rounded-l-xl ' />
                        </div>
                        <div className='flex flex-col gap-5 w-full h-full justify-center items-center'>
                            <Link href="/" className='flex items-center gap-3'>
                                <Image src="/logo.png" alt="logo.png" width={50} height={50} />
                                <span className='font-bold text-2xl'>PurpleAi</span>
                            </Link>
                            <span className='text-sm'>Sign in to create your first image</span>
                            <Button className="w-[75%]" onClick={handleGoogleSignIn} disabled={loading}>
                                {loading ? 'Signing In...' : 'Log In with Google'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
