import axios from "@/components/lib/axiosFetch"
import { REVIEWS } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useReviewMutation(){
    return useMutation(async(payload)=>{
        const {data}=await axios(payload?.type,`${REVIEWS}`,payload?.reviewData)
        return data
    })
  }