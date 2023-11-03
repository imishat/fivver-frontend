import axios from "@/components/lib/axiosFetch"
import { useMutation } from "@tanstack/react-query"


export function useUpdateUser(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`users/${payload?.id}`,payload?.data)
        return data
    })
  }