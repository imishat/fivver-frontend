import axios from "@/components/lib/axiosFetch"
import { PROJECTS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateProject(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",PROJECTS,payload)
        return data
    })
  }