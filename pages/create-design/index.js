import Main from "@/Layout/Main";
import CreateDesign from "@/components/Dashboard/CreateDesign/CreateDesign";

const create = () => {
    return (
        <Main title={'Create Project'}>
            <CreateDesign  />
        </Main>
    );
};

export default create;