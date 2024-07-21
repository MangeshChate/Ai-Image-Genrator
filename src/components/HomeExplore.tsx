import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

const HomeExplore = () => {
  return (
    <div className="lg:mt-[400px] relative lg:px-5">
      <div 
        className="h-screen relative rounded-t-[50px] rounded-b-[50px]  overflow-hidden group"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
          style={{backgroundImage: "url('/expo.jpg')", backgroundPosition: "top"}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-950 opacity-95"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-10">
          <h2 className="text-3xl lg:text-7xl font-bold text-white mb-6">Explore Our World</h2>
          <Link href="explore">
          <Button className="p-5 lg:text-2xl  font-bold px-5 border-2 border-white">
            Explore Now
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeExplore