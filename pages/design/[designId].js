import Main from '@/Layout/Main';
import DesignDescription from '@/components/DesignDescription/DesignDescription';
import { useAllDesigns } from '@/components/queries/query/designs.query';
import { useRouter } from 'next/router';


const designId = () => {

  const router = useRouter()
  const {designId} = router.query
  

  const {data} = useAllDesigns({designId:designId,page:'',limit:''})
 console.log(data)
    return (
        <Main title={'Design Description'}>
            <DesignDescription data={data} />      
        </Main>
    );
};

export default designId