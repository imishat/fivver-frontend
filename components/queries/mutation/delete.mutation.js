import axios from "@/components/lib/axiosFetch"
import { useMutation } from "@tanstack/react-query"


export function useDeleteAction(){
    return useMutation(async(payload)=>{
        const {data}=await axios("DELETE",`${payload.type}/${payload.id}`)
        return data
    })
  }