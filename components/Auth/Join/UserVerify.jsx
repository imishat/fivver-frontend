import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

import { useState, useEffect } from "react";
import { useGetOtp } from "@/components/queries/query/sendOtp.query";
import { Spin } from "@/components/utility/LoadingSpinner";
import useToast from "@/components/utility/useToast";
const UserVerify = () => {
   
    const [email,setEmail]=useState('')
    const router = useRouter()
    const{data,isLoading}=useGetOtp(email)
    const { Toast, showToast } = useToast();
    const message=data?.data.message


    console.log(data,"emailldata")
    console.log(message,"message")
   useEffect(()=>{
    if(data){
        router.push('/auth/user-verify')
        showToast('An OTP has been sent via email. message','success')
      }
   },[data])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
   
      // handle forgot password
      const handleSendOtp = data =>{
       setEmail(data)
  
      
      }
    
    return (<>
     <Toast/>
     <div className="flex justify-center">
            <div className="my-12">
           
            <form onSubmit={handleSubmit(handleSendOtp)} className=" items-center w-96">
                    <input  placeholder="Enter email..." {...register("email", { required: true })} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                  
                    <button  disabled={isLoading}className="px-4 py-2 border w-full text-[#1B8CDC]"> {isLoading? <Spin/> :"Verify"}</button>
                </form>
            </div>
        </div></>
    );
    
        
};

export default UserVerify;