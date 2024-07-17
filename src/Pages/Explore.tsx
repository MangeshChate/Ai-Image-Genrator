import Spline from '@splinetool/react-spline';
import ImageGrid from "@/components/ImageGrid"
import Navbar from "@/components/Navbar"
import '../app/globals.css';

const Explore = () => {
    return (
        <div>
            <Navbar />
            <Spline
                scene="https://prod.spline.design/aXjJzvrcAolXYZAW/scene.splinecode"
                className='absolute -z-10 hidden lg:block md:block'
            />
            <div className=" p-5 mt-10 container ">
                <div className=" lg:mb-10 flex flex-wrap">

                    <span className=" text-5xl lg:text-7xl lg:p-3 p-0 font-bold">
                        Explore Your creativity with AI generator
                    </span>

                    <span className="hidden lg:block md:block p-3 text-sm  lg:text-3xl underline">Easy to create, Safe to use.  Licensed.</span>
                </div>

                <div className="">
                    <ImageGrid />
                </div>
            </div>
        </div>
    )
}

export default Explore
