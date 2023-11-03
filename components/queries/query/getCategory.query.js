import axios from "@/components/lib/axiosFetch";
import { GET_CATEGORIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetCategoryData({categoryId}){
   return useQuery([GET_CATEGORIES,categoryId], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_CATEGORIES}?query=${categoryId}`);
    return data
   })
  }