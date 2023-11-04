import { useGetUserData } from "@/components/queries/query/getUser.query";
import { addToCart } from "@/components/redux/features/cart/cart";
import { userData } from "@/components/redux/features/user/userSlice";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  // token
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
    const messageUpdate = useSelector((state) => state.update);

  // get user
  const { data: userInfo } = useGetUserData({token,update:messageUpdate?.update});
  //  user object
  const userdata = userInfo?.data?.user;


  // get cart data
  const cartData = typeof window !== "undefined" && localStorage.getItem("selected");
  const dataParse = JSON.parse(cartData)
 
  useEffect(() => {
    dispatch(userData(userdata));
    dataParse?.map((data,i)=>{
      dispatch(addToCart(data));
    })
  }, [userInfo, token,cartData]);

  return <UserContext.Provider value={''}>{children}</UserContext.Provider>;
};

export default ContextProvider;
