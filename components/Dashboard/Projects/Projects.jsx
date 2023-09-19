import { useGetProject } from "@/components/queries/query/project.query";
import dynamic from "next/dynamic";
import { BsSearch } from "react-icons/bs";
const ClientCard = dynamic(() => import("../ClientCard"), { ssr: false });

function Projects() {
    const { data: projectData } = useGetProject({ userId: "" });
    const projects = projectData?.data?.projects;
    return (
        <div className="md:flex gap-3">
        <div className="md:w-2/3">
          <div>
            <div className="flex  flex-col sm:flex-row justify-center sm:justify-between items-center px-6 border border-gray-400 h-16">
              <h2 className="sm:text-2xl font-bold text-[#1C8CDC]">
                Active Projects - 12 ($280)
              </h2>
              {/* projects select */}
              <select
                className="sm:px-4 h-8 w-auto py-1 border border-gray-400 bg-white"
                name="project"
                id=""
              >
                <option value="active" key="active">
                  Active Projects (12)
                </option>
                <option value="rivision" key="rivision">
                  In Revision (3)
                </option>
                <option value="progress" key="progress">
                  In Progress (3)
                </option>
                <option value="waiting" key="waiting">
                  Waiting
                </option>
                <option value="delevered" key="delevered">
                  Delivered (3)
                </option>
              </select>
            </div>
            {/* Client card */}
            <div className="py-3 space-y-3">
              {projects?.length
                ? projects?.map((project, i) => {
                    return <ClientCard project={project} key={i} />;
                  })
                : "No Projects"}
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
                  <p>Completed Projects</p>{" "}
                  <span className="font-bold ">90</span>
                </li>
                <li className="flex py-2 justify-between items-center">
                  <p>Earnings</p> <span className="font-bold ">$90</span>
                </li>
                <li className="flex py-2 justify-between items-center">
                  <p>Cancelled Projects</p>{" "}
                  <span className="font-bold ">1($35)</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Total Info */}
          <div className="bg-[#FEF0F0] px-2 py-2">
            <div className="px-4 flex items-center  border-[#1C8CDC] border-b justify-between">
              <h3 className="py-3 text-[#1C8CDC] text-xl font-bold">
                All Times
              </h3>
              {/* Sort */}
              <select
                className="bg-white px-2 py-1"
                name="sortproject"
                id="sortproject"
              >
                <option value="allTimes">All Times</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Month"> Last 3 Month</option>
                <option value="last6Month"> Last 6 Month</option>
                <option value="thisYear"> This Year</option>
                <option value="2022"> 2022</option>
                <option value="2021"> 2021</option>
              </select>
            </div>
            <div className="px-4">
              <ul>
                <li className="py-2 items-center">
                  <p className="py-1">Completed Projects</p>{" "}
                  <span className="font-bold ">950</span>
                </li>
                <li className="py-2 items-center">
                  <p className="py-1">Earnings</p>{" "}
                  <span className="font-bold ">$90,54,00</span>
                </li>
                <li className="py-2 items-center">
                  <p className="py-1">Cancelled Projects</p>{" "}
                  <span className="font-bold ">6($335)</span>
                </li>
                <li className="py-2 items-center">
                  <p className="py-1">Avg. Selling Price</p>{" "}
                  <span className="font-bold ">$315</span>
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
            <div className="px-4 w-full flex items-center">
              <input
                placeholder="Type Project Number"
                className="border border-gray-400 px-3 w-full py-2"
                type="search"
                name=""
                id=""
              />
              <button className="px-4 py-3 text-white bg-[#1C8CDC]">
                <BsSearch size={20} />
              </button>
            </div>
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
                <option value="last7Days">Last 7 Days</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Month"> Last 3 Month</option>
                <option value="last6Month"> Last 6 Month</option>
                <option value="thisYear"> This Year</option>
                <option value="2022"> 2022</option>
                <option value="2021"> 2021</option>
                <option value="allTimes"> All Times</option>
              </select>
            </div>
            <div className="px-4 flex py-4 justify-center">
              <h2 className="text-5xl font-semibold">50</h2>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Projects;