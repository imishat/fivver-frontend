import { useAllDesigns } from "@/components/queries/query/designs.query";
import Pagination from "rc-pagination";
import { useState } from "react";
import DesignCard from "./DesignCard";

const Designs = () => {
  const [input,setInput] = useState('')
  const [search,setSearch] = useState('')

  const handleSearch = () =>{
    setSearch(input)
  }
 // pagination
 const [currentPage,setCurrentPage] = useState(1)
      // get all designs for related designs
  const { data: getAllDesigns } = useAllDesigns({ designId:search,page:currentPage,limit:10 });
  const allDesigns = getAllDesigns?.data?.designs;

      // Count
      const count = Math.ceil((allDesigns?.data?.totalCount || 10 )/ 10)
 
    return (
        <div>
              <div className="md:flex gap-3">
        <div className="md:w-2/3 mx-auto">
          <div>
            {/* 'Search */}
           <div className="w-full flex justify-center">
           <div className="w-96">
           <input onChange={(e)=>setInput(e.target?.value)} type="search" placeholder="Search" className="px-4 py-2 rounded border border-gray-300" id="" />
            <button onClick={()=>handleSearch()} className="px-4 text-white py-2 rounded bg-blue-400">Search</button>
           </div>
           </div>
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