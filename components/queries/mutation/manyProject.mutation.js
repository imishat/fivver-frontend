import axios from "@/components/lib/axiosFetch"
import { MANY_PROJECTS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateManyProject(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",MANY_PROJECTS,payload)
        return data
    })
  }