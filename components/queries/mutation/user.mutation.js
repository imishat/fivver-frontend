// every post or put methode create a new mutation function 
//start any new function type use thn function name example useMYdata
import axios from "@/components/lib/axiosFetch";
import { SING_UP, USER_CREATE_ACCOUNT } from "@/components/utils/constant";
import { useMutation } from "@tanstack/react-query";

export function useCreteAccount() {
    return useMutation(async (payload) => {
      
      const { data, isLoading} = await axios("POST",USER_CREATE_ACCOUNT,payload);
      return data;
    });
  }
  // singin post function 

  export function useUserSingUp(){
    return useMutation(async(payload)=>{
        
        const {data,isLoading}=await axios("POST",SING_UP,payload)
        return data
    })
  }