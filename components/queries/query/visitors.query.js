import axios from "@/components/lib/axiosFetch";
import { VISITORS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetVisitors({short}){
   return useQuery([VISITORS,short], async()=>{
    const {data,isLoading} = await axios("GET",`${VISITORS}/?of=${short}`);
    return data
   })
  }