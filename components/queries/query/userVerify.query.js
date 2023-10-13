import axios from "@/components/lib/axiosFetch";
import { GET_USER_VERIFY } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUserVerify({email,OTP}){
   return useQuery([GET_USER_VERIFY], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_USER_VERIFY}:${email}/:${OTP}`);
    return data
   })
  }