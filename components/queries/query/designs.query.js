import axios from "@/components/lib/axiosFetch";
import { GET_DESIGNS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useAllDesigns({designId,page,limit}){
   return useQuery([GET_DESIGNS,designId,page,limit], async()=>{
    const {data} = await axios("GET",`${GET_DESIGNS}?query=${designId}&page=${page}&limit=${limit}`);
    return data
   })
  }