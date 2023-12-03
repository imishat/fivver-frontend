import Pagination from "rc-pagination";
import { useState } from "react";
import CompanyCard from "../Card/CompanyCard";
import Related from "../Related/Related";
import { useAllDesigns } from "../queries/query/designs.query";
const AllDesignByCompany = ({ companyId }) => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);


  const { data: designData } = useAllDesigns({ designId: companyId , page:currentPage,limit:10});
  const query = designData?.data?.query;

  // Count
  const count = Math.ceil((designData?.data?.totalCount || 10 )/ 10)
  const designs = designData?.data?.designs
 
  return (
    <div className="w-full ">
      {/* Design Title */}
      <div className="h-full w-full relative  ">
        <img
          className="w-full h-full bg-[#FEF2F2]"
          src="https://i.ibb.co/0XcnZkw/Web-Banner-3-3.png"
          alt=""
        />
        <div className="flex justify-center items-center  text-black  ">
          <h3 className="absolute text-[#1C8CDD] md:text-4xl sm:text-2xl text-xl md:top-1/2 top-5 font-bold text-center w-1/2 left-1/2 -translate-x-1/2">
            {query}
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
      {designs?.length ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-fit gap-3 w-full">
          {designs.map((data, i) => (
            <div className="!w-[350px] border-spacing-24 border-white border-8 !h-[260px]" key={i}>
            <CompanyCard data={data} key={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <p className="capitalize">No data in {query}</p>
        </div>
      )}
</div>
</div>
      {/* pagination */}
      <div className="flex justify-center my-6">
        <Pagination
          onChange={(e) => setCurrentPage(e)}
          className="flex cursor-pointer select-none gap-2 px-3 py-1 "
          total={count}
          defaultPageSize={1}
        />
      </div>

      {/* Related */}
      <Related  currentItems={query}/>
    </div>
  );
};

export default AllDesignByCompany;
