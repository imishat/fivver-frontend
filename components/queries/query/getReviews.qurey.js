import axios from "@/components/lib/axiosFetch";
import { REVIEWS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetReviews({userId}){
   return useQuery([REVIEWS,userId], async()=>{
      if(userId){
         const {data} = await axios("GET",`${REVIEWS}?userId=${userId}&sortingOrders=createdAt-desc`);
         return data
      }
    const {data} = await axios("GET",`${REVIEWS}?sortingOrders=createdAt-desc`);
    return data
   })
  }