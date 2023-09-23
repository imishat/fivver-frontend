import AdminLayout from "@/Layout/AdminLayout";
import CreateSubCategory from "@/components/Dashboard/SubCategory/CreateSubCategory";

function create() {
    return (
        <AdminLayout title={'Create Sub Category'} routes={'SubCategories'}>
            <CreateSubCategory />
        </AdminLayout>
    );
}

export default create;