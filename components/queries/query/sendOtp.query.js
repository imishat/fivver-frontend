import axios from "@/components/lib/axiosFetch";
import { USER_SEND_OTP } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetOtp({email}){
    console.log("email",email)
   return useQuery([USER_SEND_OTP,email], async()=>{
    const {data,isLoading} = await axios("GET",`${USER_SEND_OTP}/${email}`);
    return{data,isLoading} 
   })
  }