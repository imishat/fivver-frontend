

import axios from "@/components/lib/axiosFetch";
import { MESSAGES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetMessagesById({userId,projectId}){
   return useQuery([MESSAGES,userId,projectId], async()=>{
    const {data} = await axios("GET",`${MESSAGES}?projectId=${projectId}&userId=${userId}&sortingOrders=createdAt-desc`);
    return data
   })
  }