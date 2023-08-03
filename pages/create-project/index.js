import Main from "@/Layout/Main";
import CreateProject from "@/components/Dashboard/CreateProject/CreateProject";

const create = () => {
    return (
        <Main title={'Create Project'}>
            <CreateProject />
        </Main>
    );
};

export default create;