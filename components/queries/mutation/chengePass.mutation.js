
import axios from "@/components/lib/axiosFetch"
import { PASSWORD } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdatePassword(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${PASSWORD}`,payload)
        return data
    })
  }