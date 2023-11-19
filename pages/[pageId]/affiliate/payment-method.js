import Main from "@/Layout/Main";
import PaymentMethod from "@/components/CustomarProfile/AffiliateSystem/PaymentMethod";

function paymentMethod() {
    return (
        <Main title={'Payment Information'}>
            <PaymentMethod />
        </Main>
    );
}

export default paymentMethod;