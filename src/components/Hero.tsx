import Image from "next/image"
import heroHeader from "../../public/stock/heroHeader.png"
import hero from "../../public/stock/hero.jpg";
import hero2 from "../../public/stock/hero2.jpg";
import hero3 from "../../public/stock/hero3.png";
import hero4 from "../../public/stock/hero4.avif";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
    return (
        <div className='container  pt-5 '>
            <div className='lg:p-5 p-2 '>
                <div className="flex items-center lg:gap-3 flex-wrap">
                    <span className="text-5xl lg:text-7xl font-bold" >Genrate Your Ideas Into </span>
                    <span className="hidden sm:hidden md:hidden lg:block">
                        <Image src={heroHeader} alt="hero-header.png" className="rounded-full h-[110px] w-[300px] object-cover object-center" />
                    </span>
                    <span className="text-5xl lg:text-7xl font-bold">Stunning Visuals</span>
                    <p className="hidden lg:block text-sm lg:text-lg w-[40%] ms-6 ">Introducing PurpleAi, the Genrative Ai image for brings your ideas to life perfectly match & unique visuals.</p>
                </div>
                <div className="mt-5 flex gap-3 lg:hidden md:hidden">
                    <Link href="/explore">
                        <Button className="text-mono  ">Explore</Button>
                    </Link>
                    <Link href={"/dashboard"} className="">
                        <Button className='bg-transparent border-2 rounded-lg border-purple-800'>Let's Generate</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-3 lg:h-full h-[400px] lg:p-5 lg:gap-5 gap-2 mt-5 ">
                    <div className="">
                        <Image src={hero2} alt="hero-1.png" className="h-[70%] object-cover rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl" />
                    </div>
                    <div className="flex flex-col lg:gap-5 gap-2">
                        <Image src={hero} alt="hero-2.png" className="h-[35%] object-cover rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl" />
                        <Image src={hero2} alt="hero-3.png" className="h-[35%] object-cover rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl" />

                    </div>
                    <div>
                        <Image src={hero3} alt="hero-4.png" className="h-[70%] object-cover rounded-2xl  shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl" />

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Hero
