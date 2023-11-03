

import axios from "@/components/lib/axiosFetch";
import { MESSAGES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetMessagesById({userId,projectId,update}){
   return useQuery([MESSAGES,userId,projectId,update], async()=>{
    const {data} = await axios("GET",`${MESSAGES}?projectId=${projectId}&userId=${userId}&sortingOrders=createdAt-desc`);
    return data
   })
  }