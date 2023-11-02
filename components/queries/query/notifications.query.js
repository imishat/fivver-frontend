
import axios from "@/components/lib/axiosFetch";
import { NOTIFICATIONS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetNotifications({page}){
   return useQuery([NOTIFICATIONS,page], async()=>{
    const {data} = await axios("GET",`${NOTIFICATIONS}?page=${page}&limit=10&sortingOrders=createdAt-desc`);
    return data
   })
  }