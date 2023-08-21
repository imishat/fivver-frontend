import axios from "@/components/lib/axiosFetch"
import { UPLOAD_FILE } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUploadFile(){
    return useMutation(async(payload)=>{
        const {data,isLoading}=await axios("POST",`${UPLOAD_FILE}`,payload)
        return data
    })
  }