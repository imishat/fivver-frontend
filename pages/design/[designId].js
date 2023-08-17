import Main from '@/Layout/Main';
import DesignDescription from '@/components/DesignDescription/DesignDescription';

const designId = ({data}) => {
    return (
        <Main title={'Design Description'}>
            <DesignDescription data={data} />      
        </Main>
    );
};

// get design by id with ssp
export async function getServerSideProps({ query }) {
    const { designId } = query;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/designs/${designId}`)
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  }

export default designId;