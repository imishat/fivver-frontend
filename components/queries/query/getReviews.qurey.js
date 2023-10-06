import axios from "@/components/lib/axiosFetch";
import { REVIEWS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetReviews({userId}){
   return useQuery([REVIEWS,userId], async()=>{
    const {data,isLoading} = await axios("GET",`${REVIEWS}?userId=${userId}`);
    return data
   })
  }