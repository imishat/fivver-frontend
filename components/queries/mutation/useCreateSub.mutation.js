import axios from "@/components/lib/axiosFetch"
import { GET_SUBCATEGORIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateSubCategory(){
    return useMutation(async(payload)=>{
        const {data}=await axios("POST",`${GET_SUBCATEGORIES}`,payload)
        return data
    })
  }