import Main from '@/Layout/Main';
import CustomarProfile from '@/components/CustomarProfile/CustomarProfile';

const userId = () => {
    return (
        <Main title={'Customar Profile'}>
            <CustomarProfile />
        </Main>
    );
};

export default userId;