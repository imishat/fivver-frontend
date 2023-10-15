import axios from "@/components/lib/axiosFetch";
import { GET_FILE_BY_ID } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetFile({fileId,update}){
   return useQuery([GET_FILE_BY_ID,fileId,update], async()=>{
  
    const {data} = await axios("GET",`${GET_FILE_BY_ID}/${fileId}`);
    return data
   })
  }