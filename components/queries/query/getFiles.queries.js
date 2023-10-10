import axios from "@/components/lib/axiosFetch";
import { GET_FILE_BY_ID } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetFile({fileId}){
   return useQuery([GET_FILE_BY_ID,fileId], async()=>{
      console.log(fileId)
    const {data} = await axios("GET",`${GET_FILE_BY_ID}/${fileId}`);
    return data
   })
  }