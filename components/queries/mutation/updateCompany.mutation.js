import axios from "@/components/lib/axiosFetch"
import { COMPANIES, DELETED_COMPANIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useUpdateCompany(){
    return useMutation(async(payload)=>{
        const {data}=await axios("PUT",`${COMPANIES}/${payload.id}`,payload)
        return data
    })
  }
  export function useDeleteCompany() {
    return useMutation(async (designId) => {
        console.log(designId,"dsad") 
      const { data } = await axios('DELETE', `${DELETED_COMPANIES}/${designId
      }`);
      return data;
    })
  };