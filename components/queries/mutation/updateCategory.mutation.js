import axios from "@/components/lib/axiosFetch"
import { GET_CATEGORIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateCategory(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${GET_CATEGORIES}/${payload.id}`,payload)
        return data
    })
  }