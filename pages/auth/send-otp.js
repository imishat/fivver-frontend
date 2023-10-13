import Main from "@/Layout/Main";
import SendOtp from "@/components/Auth/Join/UserVerify";



const sentOtp = () => {
    return (
        <Main title={'sendOtp'}>
            <SendOtp/>
        </Main>
    );
};

export default sentOtp;