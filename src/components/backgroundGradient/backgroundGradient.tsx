
import { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '../ui/button';
const body: HTMLElement = document.querySelector('body')!;




const BackgroundGradient = () => {
    const [color1, setColor1] = useState('#3f5efb');
    const [color2, setColor2] = useState('#fc466b');
    
    const handleChange1 = (color: string) => {
        setColor1(color);
        body.style.background= `linear-gradient(${color1}, ${color2})`

    }
    const handleChange2 = (color: string) => {
        setColor2(color);
        body.style.background= `linear-gradient(${color1}, ${color2})`


    }
    const handleRandom = () => {
        setColor1("#" + Math.round(parseInt(color1.slice(1),16)*Math.random()).toString(16));
        setColor2("#" + Math.round(parseInt(color1.slice(1),16)*Math.random()).toString(16));
        body.style.background= `linear-gradient(${color1}, ${color2})` 

    }

  return (
    <div className='absolute top-[80px]  sm:left-4/100 left-1/2 translate-x-[-50%]'>
        <Popover>
        <PopoverTrigger className='sm:text-[24px] xs:text-[18px] text-[15px] font-bold text-black' asChild>
            <Button variant="outline" className='bg-transparent py-6 px-4 border-black hover:bg-black/[0.1] transition-all delay-100'>Background Generator</Button>
            
        </PopoverTrigger>
    <PopoverContent className={'flex flex-col  align-baseline justify-center bg-gradient-to-r border-black mt-3' +`from-[${color1}]` + `to-[${color2}]`}>
            <h2 className='text-[16px] text-center mb-3 font-medium'>Choose colors to make gradietn background</h2>
            <div className='flex justify-evenly'>
                <input type="color" className='w-16 h-10 border-none fill-none  bg-transparent' onChange={(e)=>handleChange1(e.target.value)} value={color1}/>
                <input type="color"className='w-16 h-10 border-none fill-none  bg-transparent' onChange={(e)=>handleChange2(e.target.value)} value={color2}/>
            </div>
            <button className='mx-auto font-bold mt-5 p-2 text-[16px] border border-black  rounded-lg text-center box-border hover:bg-white/[0.1] transition-all delay-100 hover:scale-110' onClick={()=>{handleRandom()}}>Random</button>
        </PopoverContent>
        </Popover>
        
    </div>
  )
}

export default BackgroundGradient