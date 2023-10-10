import axios from "@/components/lib/axiosFetch";
import { PROJECTS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetUserProject({status,search,}){
   return useQuery([PROJECTS,search,status,], async()=>{
    const {data} = await axios("GET",`${PROJECTS}?query=${search}&status=${status}&sortingOrders=createdAt-desc`);
    return data
   })
  }
