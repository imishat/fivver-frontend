import { useAllStatistics } from "@/components/queries/query/getAllStatistics.query";
import { useThisMonthStatistics } from "@/components/queries/query/getStatistics.query";
import { useGetProject } from "@/components/queries/query/project.query";
import { useGetVisitors } from "@/components/queries/query/visitors.query";
import { Spin } from "@/components/utility/LoadingSpinner";
import dynamic from "next/dynamic";
import Pagination from "rc-pagination";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
const ClientCard = dynamic(() => import("../ClientCard"), { ssr: false });

function Projects() {

  const [search,setSearch] = useState('')

  // handle search
  const handleSearch = (e) =>{
    e.preventDefault()
    const input = e.target?.box?.value
    console.log(input)
    setSearch(input)
  }
  // sort
  const [status, setStatus] = useState("");

   // pagination
   const [currentPage,setCurrentPage] = useState(1)
  

  const { data: projectData,isLoading } = useGetProject({ search: search, status: status,projectId:'',page:currentPage,limit:10 });

  const projects = projectData?.data?.projects;
 

  const { data: statusActive } = useGetProject({
    search: search,
    status: "",
    projectId:'',
    page:'',limit:''
  });
  const { data: statusWaiting } = useGetProject({
    search: search,
    status: "pending",
    projectId:'',
    page:'',limit:''
  });
  const { data: statusRevision } = useGetProject({
    search: search,
    status: "revision",
    projectId:'',
    page:'',limit:''
  });
  const { data: statusProcess } = useGetProject({
    search: search,
    status: "progress",
    projectId:'',
    page:'',limit:''
  });

  const { data: statusDelivered } = useGetProject({
    search: search,
    projectId:'',
    status: "Delivered",
    page:'',limit:''
  });
  const { data: statusCOMPLETED } = useGetProject({
    search: search,
    projectId:'',
    status: "COMPLETED",
    page:'',limit:''
  });
  const { data: statusCancelled } = useGetProject({
    search: search,
    projectId:'',
    status: "Cancelled",
    page:'',limit:''
  });

  // active
  const activeProjects = statusActive?.data?.projects;
  // active
  const pendingProjects = statusWaiting?.data?.projects;
  // active
  const progressProjects = statusProcess?.data?.projects;
  // active
  const revisionProjects = statusRevision?.data?.projects;
  // active
  const deliveredProjects = statusDelivered?.data?.projects;

  // get active projects price
  const activePrice = activeProjects?.reduce(
    (partialSum, a) => partialSum + a.totalCost,
    0
  );
  // get pending projects price
  const pendingPrice = pendingProjects?.reduce(
    (partialSum, a) => partialSum + a.totalCost,
    0
  );
  // get progress projects price
  const progressPrice = progressProjects?.reduce(
    (partialSum, a) => partialSum + a.totalCost,
    0
  );
  // get revision projects price
  const revisionPrice = revisionProjects?.reduce(
    (partialSum, a) => partialSum + a.totalCost,
    0
  );
  // get delivered projects price
  const deliveredPrice = deliveredProjects?.reduce(
    (partialSum, a) => partialSum + a.totalCost,
    0
  );

  // project statistics this month
  const {data:projectStatistics} = useThisMonthStatistics()

  const statistics = projectStatistics?.data

  // project statistics state
  const [statisticsState,setProjectStatisticsState] = useState('')
  // all time statistics
  const {data:allTimeStatistics} = useAllStatistics({date:statisticsState})
  const allStatistics = allTimeStatistics?.data
  console.log(allStatistics)

  /// visitors
  const [visitorsState,setVisitorsState] = useState('days7')

  const {data:getAllVisitors} = useGetVisitors({short:visitorsState})

  const visitors = getAllVisitors?.data?.visitorCount 



  // Count
  const count = Math.ceil((projectData?.data?.totalCount || 10 )/ 10)
  
  return (
    <div className="md:flex gap-3">
      <div className="md:w-2/3">
        <div>
          <div className="flex  flex-col sm:flex-row justify-center sm:justify-between items-center px-6 border border-gray-400 h-16">
            <h2 className="sm:text-2xl font-bold text-[#1C8CDC] truncate pr-4">
               
              {
                status==='' && `Active Projects - (${statusActive?.data?.totalCount}) ($
                  ${activePrice})` 
              }
              {
                status==='pending' && `Waiting - (${statusWaiting?.data?.totalCount}) ($
                  ${pendingPrice})`              }
              {
                status==='revision' && ` Revision - (${statusRevision?.data?.totalCount}) ($
                  ${revisionPrice})`
              }
              {
                status==='progress' && `Ongoing - (${statusProcess?.data?.totalCount}) ($
                  ${progressPrice})`
              }
              {
                status==='COMPLETED' && `COMPLETED - (${statusCOMPLETED ?.data?.totalCount}) ($
                  ${deliveredPrice})`
              }
              {
                status==='Delivered ' && `Delivered - (${statusDelivered?.data?.totalCount}) ($
                  ${deliveredPrice})`
              }
              {
                status==='Cancelled' && `Cancelled - (${statusCancelled?.data?.totalCount}) ($
                  ${deliveredPrice})`
              }
              
            </h2>
            {/* projects select */}
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="sm:px-4 h-8 w-auto py-1 border border-gray-400 bg-white"
              name="project"
              id=""
            >
              <option value='' key="active">
                Active Projects ({statusActive?.data?.totalCount})
              </option>
              <option value="revision" key="revision">
                Revision ({statusRevision?.data?.totalCount})
              </option>
              <option value="progress" key="progress">
Ongoing
 ({statusProcess?.data?.totalCount})
              </option>
              <option value="pending" key="pending">
                Waiting ({statusWaiting?.data?.totalCount})
              </option>
              <option value="Delivered " key="delivered">
                Delivered ({statusDelivered?.data?.totalCount})
              </option>
              <option value="COMPLETED" key="COMPLETED">
              Completed
 ({statusCOMPLETED?.data?.totalCount})
              </option>
              <option value="Cancelled" key="Cancelled">
              Canceled
 ({statusCancelled?.data?.totalCount})
              </option>
            </select>
          </div>
          {/* Client card */}
          <div className="py-3 space-y-3">
            {isLoading ? <div className="flex justify-center items-center h-96">
              <Spin/>
            </div>
            :
            projects?.length
              ? projects?.map((project, i) => {
                  return <ClientCard project={project} key={i} />;
                })
              : "No Projects"}
          </div>
          <div className="flex justify-center my-6">
      <Pagination onChange={(e)=>setCurrentPage(e)} className="flex cursor-pointer select-none gap-2 px-3 py-1 " total={count} defaultPageSize={1} />
      </div>
        </div>
      </div>
      <div className="md:w-1/3 space-y-6">
        {/* This month Info */}
        <div className="bg-[#F2F9FF] px-2 py-2">
          <div className="px-4 ">
            <h3 className="py-3 border-b text-[#1C8CDC] border-[#1C8CDC] text-xl font-bold">
              This Month
            </h3>
          </div>
          <div className="px-4">
            <ul>
              <li className="flex py-2 justify-between items-center">
                <p>Completed Projects</p> <span className="font-bold ">{statistics?.completedProjects}</span>
              </li>
              <li className="flex py-2 justify-between items-center">
                <p>Earnings</p> <span className="font-bold ">${statistics?.completedProjectsTotalCost}</span>
              </li>
              <li className="flex py-2 justify-between items-center">
                <p>Cancelled Projects</p>{" "}
                <span className="font-bold ">{statistics?.cancelledProjects}(${statistics?.cancelledProjectsTotalCost})</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Total Info */}
        <div className="bg-[#FEF0F0] px-2 py-2">
          <div className="px-4 flex items-center  border-[#1C8CDC] border-b justify-between">
            <h3 className="py-3 text-[#1C8CDC] text-xl font-bold">All Times</h3>
            {/* Sort */}
            <select
              className="bg-white px-2 py-1"
              name="sortproject"
              id="sortproject"
            >

<option onChange={e=>setProjectStatisticsState(e.target.value)} value="days7">Last 7 Days</option>
              <option onChange={()=>setProjectStatisticsState('')} value=""> All Times</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="monthLast">Last Month</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="months3"> Last 3 Month</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="months6"> Last 6 Month</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="year0"> This Year</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="year2022"> 2022</option>
              <option onChange={e=>setProjectStatisticsState(e.target.value)} value="year2021"> 2021</option>
             
            </select>
          </div>
          <div className="px-4">
            <ul>
              <li className="py-2 items-center">
                <p className="py-1">Completed Projects</p>{" "}
                <span className="font-bold ">{allStatistics?.completedProjects}</span>
              </li>
              <li className="py-2 items-center">
                <p className="py-1">Earnings</p>{" "}
                <span className="font-bold ">${allStatistics?.completedProjectsTotalCost}</span>
              </li>
              <li className="py-2 items-center">
                <p className="py-1">Cancelled Projects</p>{" "}
                <span className="font-bold ">{allStatistics?.cancelledProjects}(${allStatistics?.cancelledProjectsTotalCost})</span>
              </li>
              <li className="py-2 items-center">
                <p className="py-1">Avg. Selling Price</p>{" "}
                <span className="font-bold ">${allStatistics?.completedProjectsAverageCost}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Search Projects */}
        <div className="bg-[#F2F9FF] px-2 py-2">
          <div className="px-4 ">
            <h3 className="py-3  text-[#1C8CDC] border-[#1C8CDC] text-xl font-bold">
              Search Project
            </h3>
          </div>
          <form onSubmit={e=>handleSearch(e)} className="px-4 w-full flex items-center">
            <input
              placeholder="Type Project Number"
              className="border border-gray-400 px-3 w-full py-2"
              type="search"
              name="box"
            />
            <button className="px-4 py-3 text-white bg-[#1C8CDC]">
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {/* New visitors */}
        <div className="bg-[#FEF0F0] px-2 py-2">
          <div className="px-4 flex items-center  border-[#1C8CDC] border-b justify-between">
            <h3 className="py-3 text-[#1C8CDC] text-xl font-bold">
              New Visitors
            </h3>
            {/* Sort */}
            <select
              className="bg-white px-2 py-1"
              name="sortproject"
              id="sortproject"
            >
              <option onChange={e=>setVisitorsState(e.target.value)} value="days7">Last 7 Days</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="monthLast">Last Month</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="months3"> Last 3 Month</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="months6"> Last 6 Month</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="year0"> This Year</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="year2022"> 2022</option>
              <option onChange={e=>setVisitorsState(e.target.value)} value="year2021"> 2021</option>
              <option onChange={()=>setVisitorsState('')} value=""> All Times</option>
            </select>
          </div>
          <div className="px-4 flex py-4 justify-center">
            <h2 className="text-3xl font-semibold">{visitors||0}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
