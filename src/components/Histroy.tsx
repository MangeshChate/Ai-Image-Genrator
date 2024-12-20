'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getHistory } from '../services/apiService';
import { Download } from 'lucide-react';

interface imgData {
    image: string;
    prompt?: string;
}

type PropType = {
    userInfo: any;
};

const History: React.FC<PropType> = ({ userInfo }) => {
    const [columns, setColumns] = useState<number>(2);
    const [images, setImages] = useState<imgData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userInfo) {
                setError('User not authenticated');
                return;
            }
            try {
                const userId = userInfo.uid;
                const historyData = await getHistory(userId);


                const formattedData = historyData.map((filename: string) => ({ image: filename }));

                setImages(formattedData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (userInfo) {
            fetchHistory();
        }
    }, [userInfo]);

    const changeColumns = (num: number) => {
        setColumns(num);
        document.documentElement.style.setProperty('--column-count', num.toString());
    };
    const handleDownload = (filename: string) => {
        const link = document.createElement('a');
        link.href = `/stock/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4">
            <div className="text-center mb-10 mt-5 flex justify-center gap-3">
                <button
                    className={clsx('outline-none py-2 px-4 border-2 rounded-lg cursor-pointer text-lg mr-2 lg:mr-0', {
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
                        <rect x="25" y="25" width="50" height="100" stroke="white" strokeWidth="5" fill="none" />
                        <rect x="125" y="25" width="50" height="100" stroke="white" strokeWidth="5" fill="none" />
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
                        <rect x="25" y="25" width="50" height="100" stroke="white" strokeWidth="5" fill="none" />
                    </svg>
                </button>
            </div>
            <div className="masonry" style={{ columnCount: columns }}>
                {error && <p className="text-red-500">{error}</p>}
                {images.map((img: imgData, index: number) => (
                    <div key={index} className="column relative shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl w-full group">
                        {img && (
                            <>
                                <img src={`/stock/${img.image}`} alt={`Image ${index}`} className="rounded-lg" />
                                
                                
                                    <Download className='absolute top-2 right-2 rounded transition-colors duration-300 opacity-0 group-hover:opacity-100 z-30 cursor-pointer' onClick={() => handleDownload(img.image)}/>
                              
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">

                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
