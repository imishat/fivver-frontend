import AdminLayout from '@/Layout/AdminLayout';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';

const index = () => {
    return (
        <AdminLayout title={'Admin Dashboard'}>
            <AdminDashboard />
        </AdminLayout>
    );
};

export default index;