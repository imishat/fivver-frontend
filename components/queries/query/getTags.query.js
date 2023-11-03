import axios from "@/components/lib/axiosFetch";
import { TAGS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetTags({tagId}){
   return useQuery([TAGS,tagId], async()=>{
    const {data,isLoading} = await axios("GET",`${TAGS}/${tagId}`);
    return data
   })
  }