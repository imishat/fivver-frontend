// every poso or put methode create a new mutation folder
//type use then file name careate any new funtion
import axios from "@/components/lib/axiosFetch";
import { USER_LOGIN } from "@/components/utils/constant";
import { useMutation } from "@tanstack/react-query";

export function useUserLogin() {
    return useMutation(async (payload) => {
        console.log('p[ay',payload)
      const { data, isLoading} = await axios("POST",USER_LOGIN,payload);
      return data;
    });
  }