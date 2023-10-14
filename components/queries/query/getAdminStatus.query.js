import axios from "@/components/lib/axiosFetch";
import {GET_ADMIN_STATS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useAdminStatus(){
   return useQuery([GET_ADMIN_STATS], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_ADMIN_STATS}`);
    return data
   })
  }