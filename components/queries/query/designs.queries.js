import axios from "@/components/lib/axiosFetch";
import { GET_DESIGNS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useAllDesigns(){
   return useQuery([GET_DESIGNS], async()=>{
    const {data} = await axios("GET",GET_DESIGNS);
    return data
   })
  }