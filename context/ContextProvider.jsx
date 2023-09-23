import { useGetUserData } from "@/components/queries/query/getUser.query";
import { userData } from "@/components/redux/features/user/userSlice";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";

export const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  // token
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  // get user
  const { data: userInfo } = useGetUserData({token});
  //  user object
  const userdata = userInfo?.data?.user;
  
  useEffect(() => {
    dispatch(userData(userdata));
  }, [userInfo, token]);

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default ContextProvider;
