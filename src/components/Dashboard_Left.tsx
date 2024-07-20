'use client'; // Add this line if not already present

import React, { useState, useEffect, useContext } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import imgdata from '../../db';
import toast from 'react-hot-toast';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../config';
import { checkRateLimit, saveHistory, getSession } from '../services/apiService';
import { DashboardContext } from '@/contexts/DashboardContext';
import { Download } from 'lucide-react';

const auth = getAuth(app);

const Dashboard_Left: React.FC = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('DashboardLeft must be used within a DashboardProvider');
  }

  const { selectedPrompt, setSelectedPrompt ,selectedRatio} = context;

  const [prompt, setPrompt] = useState<string>(selectedPrompt || '');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ratio, setRatio] = useState<string>("9:16"); // Added ratio state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPrompt(selectedPrompt || '');
    setRatio(selectedRatio || "9:16")
  }, [selectedPrompt ,selectedRatio]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast.error('Login failed.');
      console.error('Login error:', error);
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      toast.error('Please log in to generate images.');
      return;
    }

    if (prompt) {
      setLoading(true);
      try {
        const userId = user.uid;
        console.log(userId);

        // Fetch session data
        const sessionData = await getSession(userId);
        console.log('Fetched session data:', sessionData);

        // Check rate limit
        const rateLimitResponse = await checkRateLimit(userId);
        if (!rateLimitResponse.allowed) {
          toast.error('Rate limit exceeded. Try again later.');
          setLoading(false);
          return;
        }

        // Generate image
        const randomIndex = Math.floor(Math.random() * imgdata.length);
        const randomImage = imgdata[randomIndex]?.image;

        if (randomImage) {
          setSelectedImage(randomImage);

          // Save image generation history
          const saveResponse = await saveHistory(userId, randomImage);
          console.log('Save history response:', saveResponse);
          toast.success('Generated Image Saved In Profile!');

          if (saveResponse.error) {
            toast.error('Failed to save history.');
          }
        } else {
          setSelectedImage('');
        }
      } catch (error: any) {
        console.error('Error during image generation:', error);
        toast.error(`Rate limit exceeded: Try again later after 1Hr`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please provide a prompt.');
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    setSelectedPrompt(newPrompt); // Update the context
  };


  const getContainerStyle = () => {
    const ratios: any = {
      '9:16': { width: 9, height: 16 },
      '3:4': { width: 3, height: 4 },
      '1:1': { width: 1, height: 1 }
    };

    const ratioDimensions = ratios[ratio];

    if (!ratioDimensions) {
      console.error('Invalid ratio provided');
      return {};
    }

    const aspectRatio = ratioDimensions.width / ratioDimensions.height;
    const defaultHeight = window.innerWidth < 768 ? 200 : 600;  
    const calculatedWidth = defaultHeight / aspectRatio;

    return {
      width: `${calculatedWidth}px`,
      height: `${defaultHeight}px`
    };
  };
  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = `/stock/${selectedImage}`;
      link.download = selectedImage;
      link.click();
    } else {
      toast.error('No image to download.');
    }
  };
  return (
    <div className='lg:p-3 pt-3 pb-3 lg:pt-auto lg:pb-auto p-suto'>
      <div className='flex gap-3 p-3 border rounded-xl'>
        <Input
          type='text'
          placeholder='Describe your image, get playful'
          className='border-0 lg:text-lg text-sm'
          value={prompt}
          onChange={handlePromptChange}
        />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </div>



      <Card className='p-3 flex justify-center items-center mt-5 lg:w-[960px] lg:h-[660px] w-[360] h-[260]'>
        <div className='bg-[#1E1C28] rounded-xl relative' style={getContainerStyle()}>
          {selectedImage &&
            <button
              className='absolute cursor-pointer top-3 right-3 text-white'
              onClick={handleDownload}
              aria-label='Download Image'
            >
              <Download />
            </button>
          }
          {selectedImage ? (
            <img
              src={`/stock/${selectedImage}`}
              alt='Generated'
              className='max-w-full max-h-full rounded-xl w-full h-full object-cover'
            />
          ) : (
            <div className='h-full w-full flex justify-center items-center'>
              <p className='text-white text-sm lg:text-lg '>Image will appear here</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard_Left;
