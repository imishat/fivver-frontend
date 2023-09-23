import AdminLayout from "@/Layout/AdminLayout";
import UpdateDesign from "@/components/Dashboard/CreateDesign/UpdateDesign";

function designId() {
    return (
        <AdminLayout title={'Design Update'} routes={'Designs'}>
            <UpdateDesign />
        </AdminLayout>
    );
}

export default designId;