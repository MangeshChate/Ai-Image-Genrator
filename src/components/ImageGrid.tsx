
'use client';
import { useState } from 'react';
import clsx from 'clsx';
import imgdata from '../../db';

interface imgData  {
    image: string;
    prompt: string;
}

const ImageGrid = () => {
    const [columns, setColumns] = useState<number>(2);

    const changeColumns = (num: number) => {
        setColumns(num);
        document.documentElement.style.setProperty('--column-count', num.toString());
    };

    return (
        <div className=" p-4">
            <div className="text-center mb-10 mt-5 flex justify-center gap-3">
                <button className={clsx('outline-none py-2 px-4 border-2 rounded-lg cursor-pointer text-lg mr-2 lg:mr-0', {
                    'hidden lg:block bg-purple-800 text-white': columns === 4,
                    'hidden lg:block bg-transparent': columns !== 4,
                })}
                    onClick={() => changeColumns(4)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="30" height="40">
                        <rect x="25" y="25" width="75" height="75" stroke="white" strokeWidth="5" fill="none" />
                        <rect x="125" y="25" width="75" height="75" stroke="white" strokeWidth="5" fill="none" />
                        <rect x="25" y="125" width="75" height="75" stroke="white" strokeWidth="5" fill="none" />
                        <rect x="125" y="125" width="75" height="75" stroke="white" strokeWidth="5" fill="none" />
                    </svg>
                </button>

                <button
                    className={clsx('outline-none py-2 px-4 border-2 rounded-lg cursor-pointer text-lg ', {
                        'bg-purple-800 text-white': columns === 2,
                        'bg-transparent': columns !== 2,
                    })}
                    onClick={() => changeColumns(2)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="30" height="40">
                        <rect x="25" y="25" width="50" height="100" stroke="white" stroke-width="5" fill="none" />
                        <rect x="125" y="25" width="50" height="100" stroke="white" stroke-width="5" fill="none" />
                    </svg>

                </button>
                <button
                    className={clsx('outline-none py-2 px-4 border-2 rounded-lg cursor-pointer text-lg ', {
                        'bg-purple-800 text-white': columns === 1,
                        'bg-transparent': columns !== 1,
                    })}
                    onClick={() => changeColumns(1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" width="30" height="40">
                        <rect x="25" y="25" width="50" height="100" stroke="white" stroke-width="5" fill="none" />
                    </svg>

                </button>

            </div>

            <div className="masonry" style={{ columnCount: columns }}>
                {imgdata.map((img: imgData | undefined, index: number) => (
                    <div key={index} className="column relative shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl w-full">
                        {img && (
                            <>
                                <img src={`/stock/${img.image}`} alt={`Image ${index}`} className="rounded-lg" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white text-center py-2 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                    <span className='absolute bottom-3 left-0 right-0 text-xl'>
                                        {img.prompt}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
