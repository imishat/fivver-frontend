import Main from "@/Layout/Main";
import AllDesignByCompany from "@/components/AllDesign/AllDesignByCompany";
import { useRouter } from "next/router";


const designId = () => {
    // get query
    const router = useRouter()
    const {designId} = router.query
    return (
        <Main title='Pressure And Soft Washing Door Hanger Design'>
           <AllDesignByCompany companyId={designId} />
        </Main>
    );
};

export default designId;