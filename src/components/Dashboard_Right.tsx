
import { Card, CardHeader } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

const prompts = {
    "prompts": [
        {
            "prompt": "A peaceful beach at sunset",
            "tags": ["beach", "sunset", "peaceful"],
            "length": "short"
        },
        {
            "prompt": "A cozy cabin in the woods",
            "tags": ["cabin", "woods", "cozy"],
            "length": "short"
        },
        {
            "prompt": "A futuristic city skyline",
            "tags": ["futuristic", "city", "skyline"],
            "length": "short"
        },
        {
            "prompt": "An abstract geometric pattern",
            "tags": ["abstract", "geometric", "pattern"],
            "length": "short"
        },
        {
            "prompt": "A serene mountain landscape",
            "tags": ["mountain", "landscape", "serene"],
            "length": "short"
        }
    ]
};

const Dashboard_Right = () => {
    return (
        <div className='lg:p-3 p-auto lg:h-[96%] '>
            <Card className='h-full'>
                <div className='flex justify-center flex-col'>
                    <CardHeader>Custom Prompts</CardHeader>
                    <div className='flex justify-center w-full p-3'>
                        <ScrollArea className='h-72 w-full rounded-md border'>
                            <div className='divide-y '>
                                {prompts.prompts.map((prompt, index) => (
                                    <div key={index} className='p-3 cursor-pointer hover:bg-purple-950 transition-transform duration-500 ease-in-out transform hover:scale-105'>
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
                <div className='justify-center flex-col'>
                    <CardHeader>Aspect Ratio</CardHeader>
                    <div className='p-3 flex justify-between '>
                        <span className='border p-3 w-full flex justify-center rounded-l-lg hover:bg-purple-950 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer'>
                          9:16
                        </span>
                        <span className='border p-3 w-full flex justify-center hover:bg-purple-950 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer'>
                            4:3
                        </span>
                        <span className='border p-3 w-full flex justify-center rounded-r-lg hover:bg-purple-950 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer'>
                            1:1
                        </span>

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard_Right;
