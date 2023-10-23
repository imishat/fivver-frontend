import Pagination from "rc-pagination";
import { useState } from "react";
import Card from "../Card/Card";
import CategoryRelated from "../Related/CategoryRelated";
import { useAllDesigns } from "../queries/query/designs.query";
import { useGetCategoryData } from "../queries/query/getCategory.query";

const AllDesignByCatetgory = ({categoryId}) => {

  // pagination
  const [currentPage,setCurrentPage] = useState(1)
  
  // get all desings
  const {data:designData} = useAllDesigns({designId:categoryId,page:currentPage,limit:10})
  
  // get category by id
  const {data: categories} = useGetCategoryData({categoryId})
  const {data: categoriesData} = useGetCategoryData({categoryId:''})
  const category = categories?.data?.categories[0]


    
    // Count
    const count = Math.ceil((designData?.data?.totalCount || 10 )/ 10)


    const positions = categories?.data?.categories.map(element => {
      return categoriesData?.data?.categories.findIndex(item => item.categoryId === element.categoryId);
    });

    const getRelatedId = categoriesData?.data?.categories[positions?.[0]+1]?.categoryId
    console.log(positions)
    // all designs
    const designs = designData?.data?.designs
 
  return (
    <div>
      {/* Design Title */}
      <div className="h-full w-full relative">
        <img className="w-full h-full" src="/images/alldesign.png" alt="" />
        <div className="flex justify-center items-center  text-black ">
          <h3 className="absolute text-[#1C8CDD] md:text-4xl sm:text-2xl text-xl top-1/2 font-bold text-center ">
            {category?.name}
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
          <Card data={data} key={i} />
        ))
       
      
      }
      </div>
      :
        <div className="flex justify-center w-full">
          <p>No data in {category?.name}</p>
        </div>}
      {/* pagination */}
      <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
      
      {/* Related */}
      <CategoryRelated currentItems={getRelatedId} />
    </div>
  );
};

export default AllDesignByCatetgory;
