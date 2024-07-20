import React from 'react'


const ScrollContent = () => {
    return (
        <div className=''>
            <div className='flex flex-col gap-5'>
                <span className='text-4xl lg:text-6xl font-bold'>
                    <span className='text-yellow-300'>
                        Create
                    </span> and
                    <span className='ms-3 text-green-400'>
                        Edit
                    </span> Images like a
                    pro without being one.
                </span>
                <p className='lg:text-xl hidden lg:blcok md:block  text-sm'>Discover the power of Alpha Gen AI Modal.  </p>

            </div>
            <div className="lg:hidden md:hidden block h-[250px] mt-5  border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[30px] shadow-2xl ">


                <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl  p-3">
                    <img src="/dashBg.png" alt="expo_jpg" className='w-full h-full object-cover'/>
                </div>

            </div>
        </div>
    )
}

export default ScrollContent
