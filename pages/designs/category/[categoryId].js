import Main from "@/Layout/Main";
import AllDesignByCatetgory from "@/components/AllDesign/AllDesignByCatetgory";
import { useRouter } from "next/router";


const designId = () => {
    // get query
    const router = useRouter()
    const {categoryId} = router.query
    return (
        <Main title='Door Hanger Design'>
           <AllDesignByCatetgory categoryId={categoryId} />
        </Main>
    );
};

export default designId;