
import axios from "@/components/lib/axiosFetch";
import { MESSAGES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetSingleMessage({messageId,update}){
   return useQuery([MESSAGES,messageId,update], async()=>{
    const {data} = await axios("GET",MESSAGES/messageId);
    return data
   })
  }