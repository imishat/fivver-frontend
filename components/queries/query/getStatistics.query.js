import axios from "@/components/lib/axiosFetch";
import { STATISTICS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useThisMonthStatistics(){
   return useQuery([STATISTICS], async()=>{
    const {data,isLoading} = await axios("GET",`${STATISTICS}/current-month`);
    return data
   })
  }