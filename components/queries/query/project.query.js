import axios from "@/components/lib/axiosFetch";
import { PROJECTS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetProject({status,search,projectId}){
   return useQuery([PROJECTS,search,status,projectId], async()=>{
    const {data} = await axios("GET",`${PROJECTS}/${projectId}?query=${search}&status=${status}&sortingOrders=createdAt-desc`);
    return data
   })
  }