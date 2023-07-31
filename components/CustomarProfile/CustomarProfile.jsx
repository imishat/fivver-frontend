import axios from "axios";
import { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { RiFacebookFill, RiLinkedinFill } from "react-icons/ri";
import ProjectCard from "./ProjectCard";
import SellerReviews from "./SellerReviews";

const CustomarProfile = () => {
  // get completed projects
  const [completedProjects, setCompletedProjects] = useState([]);
  // fetch data
  useEffect(() => {
    axios.get(`/completed.json`).then((res) => {
      setCompletedProjects(res.data);
    });
  }, []);
  // get active projects
  const [activeProjects, setActiveProjects] = useState([]);
  // fetch data
  useEffect(() => {
    axios.get(`/projects.json`).then((res) => {
      setActiveProjects(res.data);
    });
  }, []);

  //  toggle active and colpleted
  const [toggle, setToggle] = useState("active");
  return (
    <div className="my-8 sm:flex gap-6">
      <div className="sm:w-[43%] md:w-4/12">
        {/* User info */}
        <div className=" bg-[#F2F9FF] border px-4">
          <div className="text-center mt-12 mb-6 w-full px-7 border-b border-gray-300">
            <div className="flex justify-center w-full ">
              <h1 className="text-7xl rounded-full relative w-32 flex justify-center items-center h-32 font-bold text-gray-400  bg-gray-300 ">
                C{" "}
                <span className="h-4 w-4 bottom-0 right-6 rounded-full bg-blue-500 absolute"></span>
              </h1>
            </div>
            <h2 className="text-xl font-bold py-4">clientusername</h2>
          </div>
          {/* User status */}
          <div className="mb-8 border-b pb-8">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <p className="text-base">From</p>
                <p className="text-base font-bold">United States</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Member Since</p>
                <p className="text-base font-bold">Feb 2023</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Language</p>
                <p className="text-base font-bold">English</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Last Visited</p>
                <p className="text-base font-bold">Online</p>
              </li>
            </ul>
          </div>
          {/* project status */}
          <div className="mb-8 border-b pb-8">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <p className="text-base">Completed Projects</p>
                <p className="text-base font-bold">5</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Project Completion Rate</p>
                <p className="text-base font-bold">100%</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Avg. Rating</p>
                <p className="text-base font-bold">4.9 Stars</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Avg. Rating Given</p>
                <p className="text-base font-bold">5 Star</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Last Project on</p>
                <p className="text-base font-bold">May 27 2023</p>
              </li>
            </ul>
          </div>
          {/* social media */}
          <div className=" pb-8">
            <div>
              <p className="text-center pb-4">Social Media Links</p>
              <div>
                <ul className="flex flex-wrap justify-between items-center gap-1">
                  <li>
                    <a
                      className="border-[#4B68AE] text-[#4B68AE] p-1 inline-block rounded-full border-4"
                      href="#"
                    >
                      <RiFacebookFill size={32} />
                    </a>
                  </li>
                  <li>
                    <a
                      className=" bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block rounded-full p-[4px]"
                      href="#"
                    >
                      <span className="flex h-full w-full items-center justify-center bg-white rounded-full back">
                        <svg
                          className="w-10"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="instagram"
                        >
                          <linearGradient
                            id="a"
                            x1="255.531"
                            x2="255.531"
                            y1="117.176"
                            y2="406.065"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#ea8928"></stop>
                            <stop offset="1" stopColor="#cf2b8f"></stop>
                          </linearGradient>
                          <path
                            fill="url(#a)"
                            d="M326.1 104.1H185c-47.9 0-86.9 39-86.9 86.9v141c0 47.9 39 86.9 86.9 86.9h141c47.9 0 86.9-39 86.9-86.9V191c0-47.9-38.9-86.9-86.8-86.9zm58.9 228c0 32.5-26.4 58.9-58.9 58.9H185c-32.5 0-58.9-26.4-58.9-58.9V191c0-32.5 26.4-58.9 58.9-58.9h141c32.5 0 58.9 26.4 58.9 58.9l.1 141.1z"
                          ></path>
                          <linearGradient
                            id="b"
                            x1="255.531"
                            x2="255.531"
                            y1="117.176"
                            y2="406.065"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#ea8928"></stop>
                            <stop offset="1" stopColor="#cf2b8f"></stop>
                          </linearGradient>
                          <path
                            fill="url(#b)"
                            d="M255.5 180.4c-44.7 0-81.1 36.4-81.1 81.1 0 44.7 36.4 81.1 81.1 81.1s81.1-36.4 81.1-81.1c0-44.7-36.3-81.1-81.1-81.1zm0 134.3c-29.3 0-53.2-23.9-53.2-53.2 0-29.3 23.9-53.2 53.2-53.2s53.2 23.9 53.2 53.2c0 29.4-23.8 53.2-53.2 53.2z"
                          ></path>
                          <linearGradient
                            id="c"
                            x1="340.043"
                            x2="340.043"
                            y1="117.176"
                            y2="406.065"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#ea8928"></stop>
                            <stop offset="1" stopColor="#cf2b8f"></stop>
                          </linearGradient>
                          <path
                            fill="url(#c)"
                            d="M340 156.7c-5.4 0-10.7 2.2-14.5 6-3.8 3.8-6 9.1-6 14.5s2.2 10.7 6 14.5c3.8 3.8 9.1 6 14.5 6s10.7-2.2 14.5-6c3.8-3.8 6-9.1 6-14.5s-2.2-10.7-6-14.5c-3.8-3.8-9.1-6-14.5-6z"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="border-[#37B1E2] text-[#37B1E2] p-1 inline-block rounded-full border-4"
                      href="#"
                    >
                      <BsTwitter size={32} />
                    </a>
                  </li>
                  <li>
                    <a
                      className="border-[#E23D38] text-[#E23D38] p-1 inline-block rounded-full border-4"
                      href="#"
                    >
                      <FaPinterestP size={32} />
                    </a>
                  </li>
                  <li>
                    <a
                      className="border-[#0476B4] text-[#0476B4] p-1 inline-block rounded-full border-4"
                      href="#"
                    >
                      <RiLinkedinFill size={32} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-[67%] md:w-8/12">
        {/* Projects */}
        <div className="w-full my-6 sm:my-0">
          <div className="flex mb-8 justify-around items-center text-xl font-bold">
            <button
              onClick={() => setToggle("active")}
              className={`flex justify-center ${
                toggle === "active" && "border-black border-b"
              }`}
            >
              Active Projects
            </button>
            <button
              onClick={() => setToggle("completed")}
              className={`flex justify-center ${
                toggle === "completed" && "border-black border-b"
              }`}
            >
              Completed Projects
            </button>
          </div>
          {toggle === "active" ? (
            <div className="grid sm:grid-cols-2 gap-2 w-full">
              {/* active Projects */}
              {activeProjects.map((project, i) => (
                <ProjectCard project={project} key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2 w-full">
              {/* Completed Projects */}
              {completedProjects.map((project, i) => (
                <ProjectCard project={project} key={i} />
              ))}
            </div>
          )}
        </div>
        {/* Seller reviews */}
       <div className="my-12"> <SellerReviews /></div>
      </div>
    </div>
  );
};

export default CustomarProfile;
