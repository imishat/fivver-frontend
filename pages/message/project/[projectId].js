import Main from "@/Layout/Main";
import Activity from "@/components/Message/Activity";
import PrivateRoute from "@/components/Routes/PrivateRoute";

const activity = () => {
  

    // console.log(messageData)
    return (
        <Main title={'Activity'}>
           <PrivateRoute>
           <Activity />
           </PrivateRoute>
        </Main>
    );
};

export default activity;