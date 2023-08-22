import axios from "@/components/lib/axiosFetch";
import { GET_DESIGNS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useAllDesigns({designId}){
   return useQuery([GET_DESIGNS,designId], async()=>{
    const {data} = await axios("GET",`${GET_DESIGNS}?query=${designId}`);
    return data
   })
  }