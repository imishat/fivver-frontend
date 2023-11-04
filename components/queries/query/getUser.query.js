
import axios from "@/components/lib/axiosFetch";
import { GET_USER } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUserData({token,update}){
   return useQuery([GET_USER,token,update], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_USER}`);
    return data
   })
  }