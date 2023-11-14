
import axios from "@/components/lib/axiosFetch"
import { EMAIL } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useSendMail({style}){
    return useMutation(async(payload)=>{
        const {data}=await axios("POST",`${EMAIL}?isStyledMessage=${style}`,payload)
        return data
    })
  }
