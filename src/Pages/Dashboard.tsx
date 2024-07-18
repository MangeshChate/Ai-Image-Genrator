'use client';

import Dashboard_Left from '@/components/Dashboard_Left';
import Dashboard_Right from '@/components/Dashboard_Right';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import app from '../../config';



const Dashboard = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  const handleAuthChange = useCallback((user: any | null) => {
    if (user) {
      setUser(user);
    } else {
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, [auth, handleAuthChange]);

  
  return (
    <div>
      <Navbar user={user}  />
      <Card className='container h-auto lg:h-[85vh] gap-5 mt-5 grid grid-cols-12 pb-5'>
        <div className='col-span-12 lg:col-span-9 h-full'>
          <Dashboard_Left />
        </div>
        <div className='col-span-12 lg:col-span-3 h-full'>
          <Dashboard_Right />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;