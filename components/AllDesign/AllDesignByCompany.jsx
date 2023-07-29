import Card from "@/components/Card/Card";
import axios from "axios";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import Related from "../Related/Related";
const AllDesignByCompany = () => {
    // pagination
    const [currentPage,setCurrentPage] = useState()
    console.log(currentPage)
    // Count
    const count  = 10


    // import fake data
    const [designs,setDesigns] = useState([])
    useEffect(()=>{
      axios.get(`/company.json`)
      .then(res=>{
        setDesigns(res.data)
      })
    },[])
    console.log(designs)
  return (
    <div>
      {/* Design Title */}
      <div className="h-full w-full relative">
        <img className="w-full h-full bg-[#FEF2F2]" src="/images/alldesign.png" alt="" />
        <div className="flex justify-center items-center  text-black ">
          <h3 className="absolute text-[#1C8CDD] md:text-4xl sm:text-2xl text-xl top-1/2 font-bold text-center ">
           Pressure And Soft Washing <br /> Door Hanger Designs
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
      {designs.map((data, i) => (
          <Card data={data} key={i} />
        ))}
      </div>
      {/* pagination */}
      <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
      
      {/* Related */}
      <Related />
    </div>
  );
};

export default AllDesignByCompany;
