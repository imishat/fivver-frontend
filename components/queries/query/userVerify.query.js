
import axios from "@/components/lib/axiosFetch";
import { GET_USER_VERIFY } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useVerifyUser({email,otp}){
   return useQuery([GET_USER_VERIFY,email,otp], async()=>{
    const {data} = await axios("GET",`${GET_USER_VERIFY}/${email}/${otp}`);
    return data
   })
  }