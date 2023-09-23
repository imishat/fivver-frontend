import AdminLayout from '@/Layout/AdminLayout';
import TagsUpdate from '@/components/Dashboard/Tags/TagsUpdate';

const tagsId = () => {
    return (
        <AdminLayout title={'Update Tags'} routes={'Tags'}>
            <TagsUpdate />
        </AdminLayout>
    );
};

export default tagsId;