import { useAllDesigns } from "@/components/queries/query/designs.query";
import Pagination from "rc-pagination";
import { useState } from "react";
import DesignCard from "./DesignCard";

const Designs = () => {
 // pagination
 const [currentPage,setCurrentPage] = useState(1)
      // get all designs for related designs
  const { data: getAllDesigns } = useAllDesigns({ designId:'',page:currentPage,limit:10 });
  const allDesigns = getAllDesigns?.data?.designs;

      // Count
      const count = Math.ceil((allDesigns?.data?.totalCount || 10 )/ 10)
 
    return (
        <div>
              <div className="md:flex gap-3">
        <div className="md:w-2/3 mx-auto">
          <div>
           
            {/* Client card */}
            <div className="py-3 space-y-3">
              {allDesigns?.length
                ? allDesigns?.map((project, i) => {
                    return <DesignCard project={project} key={i} />;
                  })
                : "No Projects"}
            </div>
          </div>

          <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
        </div>
      </div>
        </div>
    );
};

export default Designs;