import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import { useGetUserProject } from "../queries/query/userProject.query";
import EditModal from "./EditModal";
import ProjectCard from "./ProjectCard";
import SellerReviews from "./SellerReviews";
import SocialIcons from "./SocialIcons";

const CustomarProfile = () => {
  // get user
  const { user } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState("");
  const isAdmin = user?.role;
  //  router
  const router = useRouter();
  // get user id
  const { userId } = router.query;

  const realUser = user?.role === "ADMIN" ? userId : user?.userId;

  // get project by id
  const { data: projectData } = useGetUserProject({
    search: realUser,
    status: toggle,
  });

  // get user by id
  const { data: userData } = useGetUserData({
    userId: realUser,
    token: "",
    update: "",
  });

  const userDB = userData?.data?.user;

  const dbUser = user?.role === 'ADMIN' ? userDB:user

  // get completed projects
  const completedProjects = projectData?.data?.projects;

  const [activeProjects, setActiveProjects] = useState([]);
  // fetch data

  //  toggle active and colpleted

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
    };

    // Add event listeners for online and offline events
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    // Initial check for online/offline status
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  return (
    <div className="my-8 sm:flex gap-6 w-full">
      <div className="sm:w-[43%] md:w-4/12 ">
        {/* User info */}
        <div className=" bg-[#F2F9FF] border px-4 relative">
          <button
            className="p-3 absolute right-0"
            onClick={() => document.getElementById("editModal").showModal()}
          >
            <FaPencilAlt />
          </button>
          <div className="text-center mt-12 mb-6 w-full px-7 border-b border-gray-300">
            <div className="flex justify-center w-full ">
              {dbUser?.profilePicture ? (
                <div className="w-32 h-32 rounded-full border-4 border-blue-400 overflow-hidden">
                  <Image
                    width={100}
                    className="object-cover w-full"
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${dbUser?.profilePicture}`}
                    alt=""
                  />
                </div>
              ) : (
                <h1 className="text-7xl rounded-full relative w-32 flex justify-center items-center h-32 font-bold text-gray-400  bg-gray-300 ">
                  C{" "}
                  <span className="h-4 w-4 bottom-0 right-6 rounded-full bg-blue-500 absolute"></span>
                </h1>
              )}
            </div>
            <Link href={`/user/${dbUser?.userId}`} className="text-xl font-bold py-4 truncate">
              {dbUser?.fullName}
            </Link>
          </div>
          {/* User status */}
          <div className="mb-8 border-b pb-8">
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <p className="text-base">From</p>
                <p className="text-base font-bold">{dbUser?.country}</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Member Since</p>
                <p className="text-base font-bold">
                  {moment(dbUser?.createdAt).format("ll")}
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Language</p>
                <p className="text-base font-bold">English</p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-base">Last Visited</p>
                <p className="text-base font-bold">
                  {" "}
                  {isOnline ? "online" : "offline"}
                </p>
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
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className="sm:w-[67%] md:w-8/12">
          {/* Projects */}
          <div className="w-full my-6 sm:my-0">
            <div className="flex mb-8 justify-around items-center text-xl font-bold">
              <button
                onClick={() => setToggle("")}
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
            {toggle === "" ? (
              <div className="grid sm:grid-cols-2 gap-2 w-full">
                {/* active Projects */}
                {completedProjects?.length
                  ? completedProjects?.map((project, i) => (
                      <ProjectCard project={project} key={i} />
                    ))
                  : "No Projects"}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-2 w-full">
                {/* Completed Projects */}
                {completedProjects?.length
                  ? completedProjects?.map((project, i) => (
                      <ProjectCard project={project} key={i} />
                    ))
                  : "No Projects"}
              </div>
            )}
          </div>
          {/* Seller reviews */}
          <div className="my-12">
            {" "}
            <SellerReviews />
          </div>
        </div>
      )}
      <EditModal userId={userId} />
    </div>
  );
};

export default CustomarProfile;
