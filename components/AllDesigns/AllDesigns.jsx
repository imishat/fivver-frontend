import Pagination from "rc-pagination";
import { useState } from "react";
import DesignCard from "../Card/DesignCard";
import { useAllDesigns } from "../queries/query/designs.query";

const AllDesigns = () => {

  // pagination
  const [currentPage,setCurrentPage] = useState(1)
  
  // get all desings
  const {data:designData} = useAllDesigns({designId:'',page:currentPage,limit:10})

    
    // Count
    const count = Math.ceil((designData?.data?.totalCount || 10 )/ 10)

    // all designs
    const designs = designData?.data?.designs
 
  return (
    <div>
      {/* Design Title */}
      <div className="h-full w-full relative  xl:w-9/12 xl:mx-auto ">
        <img className="w-full h-full" src="/images/Web Banner 3 3.png" alt="" />
        <div className="flex justify-center items-center  text-black ">
          <h3 className="absolute text-[#1C8CDD] md:text-4xl sm:text-2xl text-xl top-1/2 font-bold text-center ">
           All Designs
          </h3>
        </div>
      </div>
      {/* All Designs */}
      <div>
        <div className="flex justify-center text-center py-4">
          <h2 className="md:text-2xl text-lg font-semibold">
            Click on the design you need to see more designs.
          </h2>
        </div>
      </div>
    {  designs?.length ? 
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 gap-4">
        { designs.map((data, i) => (
          <DesignCard data={data} key={i} />
        ))
       
      
      }
      </div>
      :
        ''}
      {/* pagination */}
      <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
      
      {/* Related */}
      {/* <Related /> */}
    </div>
  );
};

export default AllDesigns;
