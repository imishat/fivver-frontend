import axios from "@/components/lib/axiosFetch"
import { GET_SUBCATEGORIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateSubCategory(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${GET_SUBCATEGORIES}/${payload.id}`,payload)
        return data
    })
  }