import Main from "@/Layout/Main";
import ForgotPassword from "@/components/Auth/Join/ForgotPassword";

const forgotPassword = () => {
    return (
        <Main title={'Forgot Password'}>
            <ForgotPassword />
        </Main>
    );
};

export default forgotPassword;