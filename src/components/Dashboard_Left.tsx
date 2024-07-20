import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import imgdata from '../../db';
import toast from 'react-hot-toast';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../config';
import { checkRateLimit, saveHistory, getSession } from '../services/apiService';

const auth = getAuth(app);

const Dashboard_Left = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
        console.log(userId)
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
  
  return (
    <div className='lg:p-3 pt-3 pb-3 lg:pt-auto lg:pb-auto p-suto'>
      
          <div className='flex gap-3 p-3 border rounded-xl'>
            <Input
              type='text'
              placeholder='Describe your image, get playful'
              className='border-0 lg:text-lg text-sm'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        
      

      <Card className='p-3 flex justify-center items-center mt-5'>
        <div className='bg-[#1E1C28] lg:w-[900px] lg:h-[650px] w-[300px] h-[200px] rounded-xl'>
          {selectedImage ? (
            <img src={`/stock/${selectedImage}`} alt='Generated' className='max-w-full max-h-full rounded-xl w-full h-full object-cover' />
          ) : (
            <div className='h-full w-full flex justify-center items-center'>
              <p className='text-white'>Image will appear here</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard_Left;
