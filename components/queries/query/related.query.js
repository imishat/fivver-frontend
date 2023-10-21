import axios from "@/components/lib/axiosFetch";
import { GET_DESIGNS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetRelated({related,limit}){
   return useQuery([GET_DESIGNS,related,limit], async()=>{
    const {data} = await axios("GET",`${GET_DESIGNS}/?query=${related}&page=1&limit=${limit}&sortingOrders=priority-desc`);
    return data
   })
  }