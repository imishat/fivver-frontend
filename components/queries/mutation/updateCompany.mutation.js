import axios from "@/components/lib/axiosFetch"
import { COMPANIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateCompany(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${COMPANIES}/${payload.id}`,payload)
        return data
    })
  }