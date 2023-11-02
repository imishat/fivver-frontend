import axios from "@/components/lib/axiosFetch"
import { NOTIFICATIONS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateNotifications(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",NOTIFICATIONS,payload)
        return data
    })
  }