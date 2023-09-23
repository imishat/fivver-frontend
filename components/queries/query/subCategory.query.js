
import axios from "@/components/lib/axiosFetch";
import { GET_CATEGORIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetCategoryById({subCategoryId}){
   return useQuery([GET_CATEGORIES], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_CATEGORIES}/${subCategoryId}`);
    return data
   })
  }