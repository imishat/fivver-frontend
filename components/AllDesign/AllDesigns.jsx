import Card from "@/components/Card/Card";
import Pagination from "rc-pagination";
import { useState } from "react";
import Related from "../Related/Related";
const AllDesigns = () => {
    // pagination
    const [currentPage,setCurrentPage] = useState(0)
    console.log(currentPage)
    //  count
    const pageCount = 10
  return (
    <div>
      {/* Design Title */}
      <div className="h-full w-full relative">
        <img className="w-full h-full" src="/images/alldesign.png" alt="" />
        <div className="flex justify-center items-center  text-black ">
          <h3 className="absolute text-[#1C8CDD] md:text-4xl sm:text-2xl text-xl top-1/2 font-bold text-center ">
            Door Hanger Designs
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 gap-4">
        {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
          <Card key={i} />
        ))}
      </div>
      {/* pagination */}
      <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex gap-2 px-3 py-1 " total={500} defaultPageSize={3} />
      </div>
      {/* <div className="flex justify-center my-6">
        <div>
        <div className="flex flex-wrap items-center gap-2">
                {/* Prev btn */}
                {/* <button disabled={currentPage<=0} onClick={()=>setCurrentPage(currentPage-1)} className={`p-2 rounded-full border disabled:text-[#DDEFFE] text-[#1C8BDC]`}><MdKeyboardArrowLeft size={30} /></button> */}
                  {/* Page */}
          {/* {[...Array(pageCount).keys()].map((item, i) => 
                <button key={i} onClick={()=>setCurrentPage(i)} className={`px-3 py-1 ${currentPage===i ? 'bg-blue-200':''}`}>{item+1}</button>
               
          )} */}
           {/* Next btn */}
            {/* <button disabled={currentPage===pageCount-1} onClick={()=>setCurrentPage(currentPage+1)} className="p-2 rounded-full border disabled:text-[#DDEFFE] text-[#1C8BDC]"><MdKeyboardArrowRight size={30} /></button>
            </div>
        </div> */}
        
      {/* </div> */} 
      {/* Related */}
      <Related />
    </div>
  );
};

export default AllDesigns;
