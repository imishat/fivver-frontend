import axios from "@/components/lib/axiosFetch";
import { PROJECTS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetProject({status,search,projectId,page,limit}){
   return useQuery([PROJECTS,search,status,projectId,page,limit], async()=>{
    const {data} = await axios("GET",`${PROJECTS}/${projectId}?query=${search}&status=${status}&page=${page}&limit=${limit}&sortingOrders=createdAt-desc`);
    return data
   })
  }