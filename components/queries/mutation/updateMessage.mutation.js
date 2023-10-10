import axios from "@/components/lib/axiosFetch"
import { useMutation } from "@tanstack/react-query"


export function useUpdateMessage(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`messages/${payload.id}`,payload)
        return data
    })
  }