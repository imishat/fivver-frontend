
import axios from "@/components/lib/axiosFetch";
import { GET_CATEGORIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetCategoryById({subCategoryId}){
   return useQuery([GET_CATEGORIES,subCategoryId], async()=>{
    const {data} = await axios("GET",`${GET_CATEGORIES}/${subCategoryId}`);
    return data
   })
  }