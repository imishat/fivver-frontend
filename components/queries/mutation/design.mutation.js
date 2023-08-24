import axios from "@/components/lib/axiosFetch"
import { CREATE_DESIGN } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateDesign(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",CREATE_DESIGN,payload)
        return data
    })
  }