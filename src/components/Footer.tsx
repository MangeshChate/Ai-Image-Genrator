import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className=" text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-center  ">
            <div className='flex flex-col lg:flex-row justify-center lg:text-xl text-sm  gap-5 items-center'>
            <div className='flex justify-center gap-2'>
            <img src="/logo.png" alt="logo" className='w-[40px] ' />
            <span className='font-bold text-xl'>PurpleAi</span>
            </div>
          <p> This application uses random images from a list of pre-downloaded images for creation .</p>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer