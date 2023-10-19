import axios from "@/components/lib/axiosFetch"
import { INQUIRIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateInquiries(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",INQUIRIES,payload)
        return data
    })
  }