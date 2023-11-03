import Main from "@/Layout/Main";
import CreateDesign from "@/components/Dashboard/CreateDesign/CreateDesign";
import AdminRoute from "@/components/Routes/AdminRoute";

const create = () => {
  return (
    <Main title={"Create Project"}>
        <AdminRoute>
          <CreateDesign />
        </AdminRoute>
    </Main>
  );
};

export default create;
