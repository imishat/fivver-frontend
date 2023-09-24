import axios from "@/components/lib/axiosFetch";
import { PROJECTS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetProject({status,search}){
   return useQuery([PROJECTS,search,status], async()=>{
      console.log(search,status,"query")
    const {data,isLoading} = await axios("GET",`${PROJECTS}?query=${search}&status=${status}&sortingOrders=createdAt-desc`);
    return data
   })
  }