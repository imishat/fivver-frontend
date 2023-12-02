import { useGetCategoryData } from "@/components/queries/query/getCategory.query";
import { useGetCompanies } from "@/components/queries/query/getCompanies.query";
import Link from "next/link";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const SubNavbar = () => {
  // get user 
const {user} = useSelector(state => state.user)

/// get all designs category
const {data:categoryData} = useGetCategoryData({categoryId:''})
const categories = categoryData?.data?.categories
/// get all companies category
const {data:companyData} = useGetCompanies({companyId:''})
const companies = companyData?.data?.companies


const [showDesigns,setShowDesigns] = useState(false)
const [showCompanies,setShowCompanies] = useState(false)

  return <div className="flex lg:mt-11 justify-center bg-[#1881cc] text-white">
    <div>
      <ul className="flex flex-wrap md:py-2 items-center">
        {
          user?.role === 'ADMIN' ? <>
          <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/create-design'}>Create</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/dashboard'}>Dashboard</Link>
        </li>
        </>
        :''
        }
       
        
        <li className="relative" onMouseEnter={()=>setShowDesigns(true)} onMouseLeave={()=>setShowDesigns(false)}>
          <Link className="sm:py-2 flex items-center py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full gap-2" href={'/all-designs'}>Design <span><RiArrowDownSLine />
</span></Link>
{/* show designs */}
{
  showDesigns ? <div className="absolute left-0 top-8 bg-base-200 rounded-md text-black w-96 min-h-fit overflow-y-auto max-h-96 z-50 px-3 py-">
 {
  categories?.map((category,i)=>{
  return <Link href={`/all-designs/${category?.categoryId}`} key={i} className="py-2 inline-block px-1 border-b w-full">{category?.name}</Link>})
 }
  </div>:''
}
        </li>
        
        <li className="relative" onMouseEnter={()=>setShowCompanies(true)} onMouseLeave={()=>setShowCompanies(false)}>
          <Link className="sm:py-2 flex items-center py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full gap-2" href={'/all-designs'}>Companies <span><RiArrowDownSLine />
</span></Link>
{/* show designs */}
{
  showCompanies ? <div className="absolute left-0 top-8 bg-base-200 rounded-md text-black w-96 min-h-fit overflow-y-auto max-h-96 z-50 px-3 py-">
 {
  companies?.map((company,i)=>{
  return <Link href={`/all-designs/${company?.label}`} key={i} className="py-2 inline-block px-1 border-b w-full">{company?.label}</Link>})
 }
  </div>:''
}
        </li>
        {/* <li>
          <Link className="sm:py-2 flex items-center py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full gap-2" href={'/all-designs'}> <span><RiArrowDownSLine />
</span></Link>
        </li> */}
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/price-list'}>Price List</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/project'}>Project</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/about'}>About</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={`/${user?.username}/${user?.userId
}`}>Profile</Link>
        </li>
      </ul>
    </div>
  </div>;
};

export default SubNavbar;
