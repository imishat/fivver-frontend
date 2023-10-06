import axios from "@/components/lib/axiosFetch"
import { PROJECTS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateProject(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${PROJECTS}/${payload.id}`,payload)
        return data
    })
  }