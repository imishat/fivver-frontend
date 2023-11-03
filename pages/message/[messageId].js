import Main from "@/Layout/Main";
import PrivateRoute from "@/components/Routes/PrivateRoute";
import dynamic from "next/dynamic";
const Message = dynamic(() => import('@/components/Message/Message'), { ssr: false })

const index = () => {
  return (
    <Main title={"Message"}>
      <PrivateRoute>
        <Message/>
      </PrivateRoute>
    </Main>
  );
};

export default index;
