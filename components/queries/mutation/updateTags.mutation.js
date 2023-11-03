import axios from "@/components/lib/axiosFetch"
import { TAGS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateTags(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${TAGS}/${payload.id}`,payload)
        return data
    })
  }