"use client"
import Navbar from "@/components/Navbar"
import Hero from '@/components/Hero'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
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
    <Hero/>
    </div>
  )
}

export default Home
