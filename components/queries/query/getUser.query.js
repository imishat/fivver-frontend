
import axios from "@/components/lib/axiosFetch";
import { GET_USER } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUserData({token}){
   return useQuery([GET_USER,token], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_USER}`);
    return data
   })
  }