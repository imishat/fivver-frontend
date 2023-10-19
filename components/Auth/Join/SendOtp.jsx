import { useVerifyUser } from "@/components/queries/query/userVerify.query";
import { Spin } from "@/components/utility/LoadingSpinner";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const SendOtp  = () => {
    const { user } = useSelector((state) => state.user);
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('')
   const {data:verifyData,isLoading,isError}= useVerifyUser({email:email,otp:otp})
   // router 
   const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      // toast
      const {showToast,Toast} = useToast()
      
     
      // handle forgot password
      const handleVerifyUser = data =>{
        setEmail(data.email)
        setOtp(data.otp)
       
      }
      
      if(verifyData?.data?.user?.isVerified){
        router.push('/auth/successfully-message')
      }
    return (
        <div className="flex justify-center mx-auto">
            <Toast />
            <div className="my-12">
           
            <form onSubmit={handleSubmit( handleVerifyUser)} className=" items-center w-96">
                    <input  placeholder="Enter email..." {...register("email", { required: true })}
                    defaultValue={user?.email} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                    <input placeholder="Enter otp..." {...register("otp", { required: true })} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="number" />
                    <button type="submit" className="px-4 py-2 border w-full text-[#1B8CDC]">{isLoading && verifyData ? <Spin/>:'Verify'}</button>
                </form>
            </div>
        </div>
    );
};

export default SendOtp;