import axios from "@/components/lib/axiosFetch";
import { PROJECTS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetProject({userId}){
   return useQuery([PROJECTS,userId], async()=>{
    const {data,isLoading} = await axios("GET",`${PROJECTS}?query=${userId}&sortingOrders=createdAt-desc`);
    return data
   })
  }