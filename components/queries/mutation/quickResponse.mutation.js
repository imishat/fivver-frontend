import axios from "@/components/lib/axiosFetch"
import { QUICK_RESPONSE } from "@/components/utils/constant"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useQuickResponse(){
    return useMutation(async(payload)=>{
        const {data}=await axios(payload?.type,`${QUICK_RESPONSE}/${payload?.id}`,payload)
        return data
    })
    // {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries([QUICK_RESPONSE, quickResponseId]);
    //       // show success message
    //     },
    //     onError: (err) => {
    //       console.log(err?.response?.data?.message);
    //     }
    //   })
   
  }