
import axios from "@/components/lib/axiosFetch";
import { QUICK_RESPONSE } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetQuickResponse({quickResponseId}){
   return useQuery([QUICK_RESPONSE,quickResponseId], async()=>{
    const {data} = await axios("GET",`${QUICK_RESPONSE}/${quickResponseId}?sortingOrders=createdAt-desc`);
    return data
   })
  }