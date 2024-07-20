"use client"
import Navbar from "@/components/Navbar"
import Hero from '@/components/Hero'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";
import { useCallback, useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import ScrollContent from "@/components/ScrollContent";
import HomeExplore from "@/components/HomeExplore";
import Testamonial from "@/components/Testamonial";

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
    <div className="overflow-hidden">
    <Navbar user={user}/>
    <Hero/>
    

    <ContainerScroll titleComponent={<ScrollContent/>} children={<img src="/dashBg.png" alt="dashboard_img" className="w-full h-full object-cover"></img>} />

    <HomeExplore/>
    <Testamonial/>
    
    </div>
  )
}

export default Home
