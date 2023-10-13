import Main from "@/Layout/Main";
import UserVerify from "@/components/Auth/Join/SendOtp";


const verifyUser = () => {
    return (
        <Main title={'userVerify'}>
            <UserVerify/>
        </Main>
    );
};

export default verifyUser;