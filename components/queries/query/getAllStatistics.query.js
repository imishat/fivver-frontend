import axios from "@/components/lib/axiosFetch";
import { STATISTICS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useAllStatistics({date}){
   return useQuery([STATISTICS,date], async()=>{
    const {data,isLoading} = await axios("GET",`${STATISTICS}?of=${date}`);
    return data
   })
  }