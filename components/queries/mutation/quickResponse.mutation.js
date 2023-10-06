import axios from "@/components/lib/axiosFetch"
import { QUICK_RESPONSE } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useQuickResponse(){
    return useMutation(async(payload)=>{
        const {data}=await axios(payload?.type,`${QUICK_RESPONSE}/${payload?.id}`,payload)
        return data
    })
  }