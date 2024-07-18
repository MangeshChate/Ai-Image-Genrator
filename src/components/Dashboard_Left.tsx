import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import imgdata from '../../db';
import toast from 'react-hot-toast';

const Dashboard_Left = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleGenerate = () => {
    if(prompt){
      const randomIndex = Math.floor(Math.random() * imgdata.length);
      const randomImage = imgdata[randomIndex]?.image;
  
      if (randomImage) {
        setSelectedImage(randomImage);
      } else {
        setSelectedImage('');
        console.log('Error: Image URL not found in selected data.');
      }

    }else{
      
      toast.error("Please provide a prompt.");

    }
  };

  return (
    <div className='lg:p-3 pt-3 pb-3 lg:pt-auto lg:pb-auto p-suto'>
      <div className='flex gap-3 p-3 border rounded-xl'>
        <Input
          type='text'
          placeholder='Describe your image, get playful '
          className='border-0 lg:text-lg text-sm'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleGenerate}>Generate</Button>
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
