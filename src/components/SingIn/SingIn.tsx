import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { SingInSchema } from '@/lib/validation';
import Tilt from 'react-parallax-tilt';
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"






function SingIn({onRouteChange, getUser}){
    const {toast} = useToast();

    const singInform = useForm<z.infer<typeof SingInSchema>>({
        resolver: zodResolver(SingInSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })
    
    async function onSubmit(values: z.infer<typeof SingInSchema>) {
        try{
            
            const singin = await fetch("https://facerecognitionapi-tc7x.onrender.com/singin",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(values)
              }).then(data=>data.json())

              if(singin.status == 400){
                return toast({variant: "destructive",title: "Sing In failed. Pleas try again"})    
              }else if(singin.status == 200){
                getUser(singin.user)
                onRouteChange("home")
                return toast({variant: "positive",title: "Sing In succeded."})
              }
              
        }catch(err){
            console.error(err)
            console.log('asa')
            
        }
      }
    
   

    return(
        <>
        <Form {...singInform}>
            <div className='max-w-[510px] m-auto'>
                <Tilt className="br2 ba dark-gray b--black-10 mv4  w-[80%]  mw6 center tc shadow-5 p-5 sm:p-[35px]">
                    <form className="measure center" onSubmit={singInform.handleSubmit(onSubmit)}>
                        <FormField
                            control={singInform.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sm:text-[28px] text-[24px] mb-7 text-black max-[450px]:text-[20px]">Email</FormLabel>
                                    <FormControl>
                                        <Input  className='min-[450px]:p-5 p-2 bg-transparent  border-black text-blackp' {...field} />
                                    </FormControl>
                                    <FormMessage className='shad-form_message'/>
                                </FormItem>
                        )}
                        />
                        <FormField
                            control={singInform.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="min-[450px]:mt-5 mt-2">
                                    <FormLabel className="sm:text-[28px] text-[24px] text-black max-[450px]:text-[20px]">Password</FormLabel>
                                    <FormControl>
                                        <Input  className='min-[450px]:p-5 p-2 bg-transparent border-black text-black'{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                        <Button type="submit" className='mt-7 bg-transparent border border-black text-black'>Submit</Button>
                        <div className="lh-copy mt-4">
                        <a href="#" className="f6 link dim black db pointer" onClick={()=>onRouteChange('register')}>Register</a>
                        </div>
                     </form>
                </Tilt>
            </div>
        </Form>
        </>
    );
}
export default SingIn;