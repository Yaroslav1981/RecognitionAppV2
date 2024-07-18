
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { SingUpSchema } from '@/lib/validation';
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

function Register({onRouteChange, getUser}){

    const {toast} = useToast();

    const singUpform = useForm<z.infer<typeof SingUpSchema>>({
        resolver: zodResolver(SingUpSchema),
        defaultValues: {
          name:"",
          email: "",
          password: "",
        },
      })
    
      async function onRegister(values: z.infer<typeof SingUpSchema>) {
        try{
            
            const singin = await fetch("https://facerecognitionapi-tc7x.onrender.com/register",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(values)
              }).then(data=>data.json())

              if(singin.status == 400){
                return toast({variant: "destructive",title: "Registration failed. Pleas try again"})    
              }else if(singin.status == 200){
                
                getUser(singin.user)
                onRouteChange("home")
                return toast({variant: "positive",title: "Registration succeded."})
              }
              
        }catch(err){
            console.error(err)

            
        }
      }



    return(
        <Form {...singUpform}>
        <div className='max-w-[510px] m-auto'>
            <Tilt className="br2 ba dark-gray b--black-10 mv4 w-[80%]  mw6 center tc shadow-5 p-5 sm:p-[35px]">
                <form className="measure center" onSubmit={singUpform.handleSubmit(onRegister)}>
                <FormField
                        control={singUpform.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="sm:text-[28px] text-[24px] max-[450px]:text-[20px] text-black">Name</FormLabel>
                                <FormControl>
                                    <Input  className='min-[450px]:p-5 p-2 bg-transparent border-black text-black'{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={singUpform.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='min-[450px]:mt-5 mt-2'>
                                <FormLabel className="sm:text-[28px] text-[24px] max-[450px]:text-[20px] text-black">Email</FormLabel>
                                <FormControl>
                                    <Input  className=' bg-transparent min-[450px]:p-5 p-2 border-black text-black' {...field} />
                                </FormControl>
                                <FormMessage className='shad-form_message'/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={singUpform.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="min-[450px]:mt-5 mt-2">
                                <FormLabel className="sm:text-[28px] text-[24px] max-[450px]:text-[20px] text-black">Password</FormLabel>
                                <FormControl>
                                    <Input  className='min-[450px]:p-5 p-2 bg-transparent border-black text-black'{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />
                    <Button type="submit" className='mt-7 bg-transparent border border-black text-black'>Register</Button>
                 </form>
            </Tilt>
        </div>
    </Form>
        
    );
}
export default Register;