import axios from "@/components/lib/axiosFetch"
import { DELETED_CATEGORIES, GET_CATEGORIES } from "@/components/utils/constant"
import { useMutation } from "@tanstack/react-query"


export function useCreateCategory(){
    return useMutation(async(payload)=>{
        const {data}=await axios("POST",`${GET_CATEGORIES}`,payload)
        return data
    })
  }
  export function useDeleteCatagory() {
    return useMutation(async (designId) => {
        console.log(designId,"dsad") 
      const { data } = await axios('DELETE', `${DELETED_CATEGORIES}/${designId
      }`);
      return data;
    })
  };