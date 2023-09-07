import Main from '@/Layout/Main';
import AdminRoute from '@/components/Routes/AdminRoute';
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('@/components/Dashboard/Dashboard'), { ssr: false })

const index = () => {
    return (
        <Main title={'Dashboard'}>
           <AdminRoute>
           <Dashboard />
           </AdminRoute>
        </Main>
    );
};

export default index;