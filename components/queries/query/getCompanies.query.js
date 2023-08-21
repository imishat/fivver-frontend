import axios from "@/components/lib/axiosFetch";
import { COMPANIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetCompanies(){
   return useQuery([COMPANIES], async()=>{
    const {data,isLoading} = await axios("GET",`${COMPANIES}`);
    return data
   })
  }