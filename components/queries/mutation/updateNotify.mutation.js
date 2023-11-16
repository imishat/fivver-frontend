import axios from "@/components/lib/axiosFetch"
import { useMutation } from "@tanstack/react-query"


export function useUpdateNotify(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`inquiries/${payload.id}`,payload)
        return data
    })
  }