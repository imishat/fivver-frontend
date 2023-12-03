import { useRouter } from "next/router";
import Pagination from "rc-pagination";
import { useState } from "react";
import Card from "../Card/Card";
import CategoryRelated from "../Related/CategoryRelated";
import { useAllDesigns } from "../queries/query/designs.query";
import { useGetCategoryData } from "../queries/query/getCategory.query";

const AllDesignByCatetgory = ({ categoryId }) => {

  // pagination
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()


  // get all desings
  const { data: designData } = useAllDesigns({ designId: categoryId, page: currentPage, limit: 10 })

  // get category by id
  const { data: categories } = useGetCategoryData({ categoryId })
  const { data: categoriesData } = useGetCategoryData({ categoryId: '' })
  const category = categories?.data?.categories[0]


  // Count
  const count = Math.ceil((designData?.data?.totalCount || 10) / 10)


  const othersCategoryData = categoriesData?.data?.categories?.filter(cat => cat.categoryId !== categoryId)

  console.log(othersCategoryData)
  const designs = designData?.data?.designs

  return (
    <div className=" w-full ">
     <div>
       {/* Design Title */}
       <div className="h-full w-full relative ">
        <img className="w-full h-full" src="/images/Web Banner 2.jpg" alt="" />
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
    <div className="w-[80%] mx-auto">
   <div className="flex justify-center">
   {designs?.length ?
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-fit gap-3 w-full">
          {designs.map((data, i) => (
            <div className="!w-[350px] border-spacing-24 border-white border-8 !h-[260px]" key={i}>
            <Card data={data} key={i} />
            </div>
          ))


          }
        </div>
        :
        <div className="flex justify-center w-full">
          <p>No data in {category?.name}</p>
        </div>}
   </div>
      {/* pagination */}
      <div className="flex justify-center my-6">
        <Pagination onChange={(e) => setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
    </div>
     </div>

      {/* Related */}
      <CategoryRelated currentItems={othersCategoryData} />
    </div>
  );
};

export default AllDesignByCatetgory;
