
import axios from "@/components/lib/axiosFetch";
import { GET_SUBCATEGORIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetSubCategoryById({subcategoryId}){
   return useQuery([GET_SUBCATEGORIES,subcategoryId], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_SUBCATEGORIES}/${subcategoryId}`);
    return data
   })
  }