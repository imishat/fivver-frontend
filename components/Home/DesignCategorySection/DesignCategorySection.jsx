import { RiArrowDownDoubleLine } from 'react-icons/ri';
import DesignCategorySectionCard from "./DesignCategorySectionCard";

export default function  DesignCategorySection  () {
    return (
         <div className="space-y-3">
             {
                [1,1,1,1].map((item,i)=><DesignCategorySectionCard key={i} />)
            }
              
              {/* // Pagination */}
              <div className='flex justify-center'>
                <button className='border rounded-full'><RiArrowDownDoubleLine size={66} /></button>
              </div>
        </div>
       
    );
};

