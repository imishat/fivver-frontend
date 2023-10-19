import axios from "@/components/lib/axiosFetch";
import { INQUIRIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useMessageData(){
   return useQuery([INQUIRIES], async()=>{
    const {data,isLoading} = await axios("GET",INQUIRIES);
    return data
   })
  }