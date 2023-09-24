import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    if (typeof window === "undefined") return null;
  // get user
  const { user } = useSelector((state) => state.user);
  // router
  const router = useRouter();
  // token
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  if (!user?.email || user?.role !== "ADMIN" || !token) {
   router.push("/");
  }
  if(user?.role === 'ADMIN'){
      return children;
  }
};

export default AdminRoute;
