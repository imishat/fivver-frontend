import Main from "@/Layout/Main";
import AllDesignByCompany from "@/components/AllDesign/AllDesignByCompany";
import { useRouter } from "next/router";


const designId = () => {
    // get query
    const router = useRouter()
    const {companyId} = router.query
    return (
        <Main title='Pressure And Soft Washing Door Hanger Design'>
           <AllDesignByCompany companyId={companyId} />
        </Main>
    );
};

export default designId;