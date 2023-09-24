import axios from "@/components/lib/axiosFetch"
import { GET_CATEGORIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateCategory(){
    return useMutation(async(payload)=>{
        const {data}=await axios("POST",`${GET_CATEGORIES}`,payload)
        return data
    })
  }