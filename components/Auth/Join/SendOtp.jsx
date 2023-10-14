import { useGetUserVerify } from "@/components/queries/query/userVerify.query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
const SendOtp  = () => {
    const { user } = useSelector((state) => state.user);
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('')
   const{data}=useGetUserVerify({email:email,OTP:otp})
   console.log(data,"mea")
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      // handle forgot password
      const handleVerifyUser = data =>{
       
        setEmail(data.email)
        setOtp(data.otp)
        // reset()
      }
    
    return (
        <div className="flex justify-center mx-auto">
            <div className="my-12">
           
            <form onSubmit={handleSubmit( handleVerifyUser)} className=" items-center w-96">
                    <input  placeholder="Enter email..." {...register("email", { required: true })}
                    defaultValue={user?.email} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                    <input placeholder="Enter otp..." {...register("otp", { required: true })} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="number" />
                    <button   type="submit" className="px-4 py-2 border w-full text-[#1B8CDC]">Send Code</button>
                </form>
            </div>
        </div>
    );
};

export default SendOtp;