
import axios from "@/components/lib/axiosFetch";
import { GET_USER } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUserData({token,userId}){
   return useQuery([GET_USER,token,userId], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_USER}/${userId}`);
    return data
   })
  }