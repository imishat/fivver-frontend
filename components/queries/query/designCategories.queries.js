import axios from "@/components/lib/axiosFetch";
import { GET_CATEGORIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetDesignCategoriesData({page,limit}){
   return useQuery([GET_CATEGORIES,limit], async()=>{
    const {data,isLoading} = await axios("GET",`${GET_CATEGORIES}?limit=${limit}&page=${page}`)
    return data
   })
  }