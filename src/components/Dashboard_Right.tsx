import { Card, CardHeader } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useContext, useRef, useState } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext';
import { CrossIcon, Delete, DeleteIcon, LucideUpload, PanelRightCloseIcon, RemoveFormatting, Trash, Trash2, UploadIcon } from 'lucide-react';

const prompts = {
    "prompts": [
        { "prompt": "A peaceful beach at sunset", "tags": ["beach", "sunset", "peaceful"], "length": "short" },
        { "prompt": "A cozy cabin in the woods", "tags": ["cabin", "woods", "cozy"], "length": "short" },
        { "prompt": "A futuristic city skyline", "tags": ["futuristic", "city", "skyline"], "length": "short" },
        { "prompt": "An abstract geometric pattern", "tags": ["abstract", "geometric", "pattern"], "length": "short" },
        { "prompt": "A serene mountain landscape", "tags": ["mountain", "landscape", "serene"], "length": "short" }
    ]
};

const Dashboard_Right = () => {
    const context = useContext(DashboardContext);


    if (!context) {
        throw new Error('DashboardRight must be used within a DashboardProvider');
    }

    const [selectedRatio, setSelectedRatioState] = useState<string | null>("9:16");
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleCardClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Context
    const { setSelectedPrompt, setSelectedRatio } = context;

    const handlePromptSelect = (prompt: string) => {
        setSelectedPrompt(prompt);
    };

    const handleRatioSelect = (ratio: string) => {
        setSelectedRatioState(ratio);
        setSelectedRatio(ratio);
    }

    return (
        <div className='lg:p-3 p-auto h-full '>
            <Card className='h-full'>
                <div className='flex justify-center flex-col'>
                    <CardHeader>Custom Prompts</CardHeader>
                    <div className='flex justify-center w-full p-3'>
                        <ScrollArea className='h-72 w-full rounded-md border'>
                            <div className='divide-y '>
                                {prompts.prompts.map((prompt, index) => (
                                    <div
                                        key={index}
                                        className='p-3 cursor-pointer hover:bg-purple-950 transition-transform duration-500 ease-in-out transform hover:scale-105'
                                        onClick={() => handlePromptSelect(prompt.prompt)}
                                    >
                                        <p className='text-sm'>{prompt.prompt}</p>
                                        <div className='flex'>
                                            {prompt.tags.map((tag, idx) => (
                                                <span key={idx} className='pe-3 text-purple-600'>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className=' flex justify-center flex-col'>
                    <CardHeader>Aspect Ratio</CardHeader>
                    <div className='p-3 flex justify-between'>
                        {['9:16', '3:4', '1:1'].map((ratio, index) => (
                            <span
                                key={index}
                                className={`border p-3 w-full flex justify-center ${index === 0 ? 'rounded-l-lg' : index === 2 ? 'rounded-r-lg' : ''} ${selectedRatio === ratio ? 'bg-purple-950 text-white' : 'hover:bg-purple-950'
                                    } transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer`}
                                onClick={() => handleRatioSelect(ratio)}
                            >
                                {ratio}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="justify-center flex flex-col">
                    <CardHeader>Upload Reference Image</CardHeader>
                    <div className='p-3 relative'>
                        {imageSrc &&
                            <Trash2 className='top-4 right-5 absolute cursor-pointer text-red-400' onClick={() => setImageSrc(null)} />
                        }
                        <Card
                            className='flex justify-center border border-dashed w-full h-[5rem]  items-center cursor-pointer '
                            onClick={handleCardClick}
                        >
                            {imageSrc ? (
                                <img src={imageSrc} alt="Uploaded" className="h-full object-contain" />
                            ) : (
                                <LucideUpload className='text-secondary' />
                            )}
                        </Card>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard_Right;
