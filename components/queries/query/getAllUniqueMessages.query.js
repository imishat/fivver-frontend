import axios from "@/components/lib/axiosFetch";
import { MESSAGES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUniqueMessages(){
   return useQuery([MESSAGES], async()=>{
    const {data,isLoading} = await axios("GET",`${MESSAGES}/unique`);
    return data
   })
  }