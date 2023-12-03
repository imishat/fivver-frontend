import Link from "next/link"
import { useRouter } from "next/router"
import Pagination from "rc-pagination"
import { useState } from "react"
import CompanyCard from "../Card/CompanyCard"
import { useAllDesigns } from "../queries/query/designs.query"

const Design = () => {
  const router = useRouter()
  const { searchId, designId } = router.query

  // pagination
  const [currentPage, setCurrentPage] = useState(1)

  // get all desings
  const { data: designData } = useAllDesigns({ designId: searchId || designId || '', page: currentPage, limit: 10 })


  // Count
  const count = Math.ceil((designData?.data?.totalCount || 10) / 10)

  // all designs
  const designs = designData?.data?.designs
  return (
    <>
      <div>

        <div className=" flex justify-center text-center py-4">
          <div className="md:text-2xl font-semibold">

            <p className="text-black">You select the company/service and design of your choice.
              . </p>
            <p className="text-black">And see your selected items below.</p>
          </div>
        </div>
      </div>
   <div className="flex justify-center">
   <div className="w-[80%] max-w-fit mx-auto">
      {/* comnany */}
      <div>
        <div className="my-6">
          {/* Design card */}
          <ul className='flex sm:px-8 gap-2 flex-wrap'>
            <li><Link href={'/all-designs/Solar'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Solar</Link></li>
            <li><Link href={'/all-designs/Pressure Washing'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Pressure Washing</Link></li>
            <li><Link href={'/all-designs/Real Estate'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Real Estate</Link></li>
            <li><Link href={'/all-designs/Lawn Care'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Lawn Care</Link></li>
            <li><Link href={'/all-designs/Moving'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Moving</Link></li>
            <li><Link href={'/all-designs/Cleaning Services'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Cleaning Services</Link></li>
            <li><Link href={'/all-designs/Others'} className='bg-[#ffefef] p-2 text-black px-3 rounded-full'>Others</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-b-2 border-[#1881cc]" />
      {/* catagory */}
      <div className=" ">
        <div className="my-6">
          {/* Design card */}
          <ul className='flex sm:px-8 gap-2 flex-wrap'>
            <li><Link href={'/all-designs/Buisness Card'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Buisness Card</Link></li>
            <li><Link href={'/all-designs/Door Hanger'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Door Hanger</Link></li>
            <li><Link href={'/all-designs/Flyer'} className='bg-[#dceefa] p-2text-black px-3 rounded-full'>Flyer</Link></li>
            <li><Link href={'/all-designs/Postcard'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Postcard</Link></li>
            <li><Link href={'/all-designs/Brochure'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Brochure</Link></li>
            <li><Link href={'/all-designs/Billboard'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Billboard</Link></li>
            <li><Link href={'/all-designs/Yard Sign'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Yard Sign</Link></li>
            <li><Link href={'/all-designs/Orders'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Orders</Link></li>
            <li><Link href={'/all-designs/Orders'} className='bg-[#dceefa] p-2 text-black px-3 rounded-full'>Orders</Link></li>
          </ul>
        </div>
      </div>
   
       {/* all designs */}
       {designs?.length ?
        <div className=" grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-fit gap-3 w-full">
          {designs.map((data, i) => (
             <div className="w-[350px] h-[260px] mb-6" key={i}>
            <CompanyCard data={data} key={i} />
            </div>
          ))


          }
        </div>
        :
        'NO DESING'}
     </div>
   </div>
      {/* pagination */}
      <div className="flex justify-center my-6">
       
        <Pagination onChange={(e) => setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>

    </>
  )


}
export default Design