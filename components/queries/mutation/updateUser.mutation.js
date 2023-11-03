import axios from "@/components/lib/axiosFetch"
import { GET_USER } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateUser(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${GET_USER}`,payload)
        return data
    })
  }