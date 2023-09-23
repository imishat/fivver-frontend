import AdminLayout from "@/Layout/AdminLayout";
import UpdateCategory from "@/components/Dashboard/Categories/UpdateCategory";

function categoryId() {
    
    return (
        <AdminLayout title={'Update Category'}  routes='Categories'>
            <UpdateCategory />
        </AdminLayout>
    );
}

export default categoryId;