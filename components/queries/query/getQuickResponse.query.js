
import axios from "@/components/lib/axiosFetch";
import { QUICK_RESPONSE } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetQuickResponse({quickResponseId,update}){
   return useQuery([QUICK_RESPONSE,quickResponseId,update], async()=>{
    const {data} = await axios("GET",`${QUICK_RESPONSE}/${quickResponseId}?sortingOrders=createdAt-asc`);
    return data
   })
  }