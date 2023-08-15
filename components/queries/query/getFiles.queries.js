import axios from "@/components/lib/axiosFetch";
import { GET_FILE_BY_ID } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetFile(){
   return useQuery([GET_FILE_BY_ID], async()=>{
    const {data} = await axios("GET",GET_FILE_BY_ID/'sa4');
    return data
   })
  }