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
      {designs?.length ?
        <div className="md:w-full xl:max-w-7xl lg:max-w-max mx-auto 2xl:w-[100%] xl:mx-auto gap-5 md:gap-8 lg:gap-24 lg:px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {designs.map((data, i) => (
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
        <Pagination onChange={(e) => setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>

      {/* Related */}
      <CategoryRelated currentItems={othersCategoryData} />
    </div>
  );
};

export default AllDesignByCatetgory;
