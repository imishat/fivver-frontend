import AdminLayout from "@/Layout/AdminLayout";
import UpdateCompany from "@/components/Dashboard/Companies/UpdateCompany";

const companyId = () => {
    return (
        <AdminLayout title={'Update Company'} routes='Companies'>
            <UpdateCompany />
        </AdminLayout>
    );
};

export default companyId;