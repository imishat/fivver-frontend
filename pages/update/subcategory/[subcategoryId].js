import AdminLayout from '@/Layout/AdminLayout';
import UpdateSub from '@/components/Dashboard/SubCategory/UpdateSub';

const subcategoryId = () => {
    return (
        <AdminLayout title={'Update Sub Category'} routes={'SubCategories'}>
            <UpdateSub />
        </AdminLayout>
    );
};

export default subcategoryId;