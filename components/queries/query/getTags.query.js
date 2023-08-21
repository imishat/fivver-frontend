import axios from "@/components/lib/axiosFetch";
import { TAGS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetTags(){
   return useQuery([TAGS], async()=>{
    const {data,isLoading} = await axios("GET",`${TAGS}`);
    return data
   })
  }