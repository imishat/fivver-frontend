import axios from "@/components/lib/axiosFetch"
import { MESSAGES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateMessage(){
    return useMutation(async(payload)=>{
        const {data}=await axios("POST",`${MESSAGES}`,payload)
        return data
    })
  }