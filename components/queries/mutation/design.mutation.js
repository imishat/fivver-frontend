import axios from "@/components/lib/axiosFetch"
import { CREATE_DESIGN } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateDesign(){
    return useMutation(async(payload)=>{
        
        const {data}=await axios("POST",CREATE_DESIGN,payload)
        return data
    })
  }
  export function useDeleteDEsing() {
    return useMutation(async (designId) => {
        console.log(designId,"dsad") 
      const { data } = await axios('DELETE', `${CREATE_DESIGN}/${designId
      }`);
      return data;
    })
  };