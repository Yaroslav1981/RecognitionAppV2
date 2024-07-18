
import { Button } from "@/components/ui/button"


 const ImageLinkForm =  ({onButtonClick,onChange})=>{
    
    return (
        <div className="flex flex-col justify-center items-center gap-7">
            <p className="sm:text-[24px] text-[20px] text-center mt-5">Please, enter a link to recognise faces</p>
            <div className="w-[80%] flex justify-center">
            <input type="text" className="input-reset border border-black rounded-lg w-[80%] bg-transparent p-[7px]" onChange={onChange}/>
            <Button className="bg-transparent ml-7 border-black w-16 rounded-2xl p-1" variant={"outline"} onClick={()=>onButtonClick()}>Detect</Button>
            </div>
           
        </div> 
    );
}
export default ImageLinkForm