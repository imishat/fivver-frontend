import axios from "@/components/lib/axiosFetch";
import { COMPANIES } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";


export function useGetCompanies({companyId}){
   return useQuery([COMPANIES,companyId], async()=>{
    const {data,isLoading} = await axios("GET",`${COMPANIES}/${companyId}`);
    return data
   })
  }