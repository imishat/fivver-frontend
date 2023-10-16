import Image from "next/image";
import Link from "next/link";
import { useGetUserData } from "../queries/query/getUserProfile.query";

const ClientCard = ({project}) => {

    // const getUserById 
    const {data:userData} = useGetUserData({token:'',userId:project?.startedBy,update:''})
    const user = userData?.data?.user

    const color = 
    project?.status==='Revision' && 'text-[#DF7138]' 
    || 
    project?.status==='Progress' && 'text-[#DA560A]'
    || 
    project?.status==='Pending' && 'text-[#7f3055]'
    || 
    project?.status==='Delivered' && 'text-[#9dcccd]'
    || 
    project?.status==='COMPLETED' && 'text-[#14591a]'
    ||
    project?.status==='Active' && 'text-[#DA560A]'
    return (
       
        <div className="bg-[#F4F9FF] border border-gray-400 p-4">
             <div className="py-1">
                <p className="font-bold">{project.title}</p>
            </div>
            <div className="sm:flex justify-between items-center ">
          
          <div className="sm:flex items-center gap-4">
              <div className="sm:w-24 h-44 sm:h-16 w-full">
                  <Image height={96} width={96} className="object-cover w-full h-full" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${project?.imageIds[0]}`} alt="" />
              </div>
              <div className="flex py-3 sm:py-0 items-center gap-2">
                  <Image  height={50} width={50} className="object-cover w-8 h-8 rounded-full" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${user?.profilePicture}`}  alt="" />
                  <p className="font-bold">{user?.fullName}</p>
              </div>
          </div>
          <div className=" sm:w-6/12">
              <ul className="flex justify-between w-full items-center">
                  <li className="text-center">
                      <p>Price</p>
                      <span className="font-bold text-lg">${project?.totalCost}</span>
                  </li>
                  <li className="text-center">
                      <p>Time</p>
                      <span className="font-bold text-lg">1 day late</span>
                  </li>
                  <li className="text-center">
                      <p>Status</p>
                      <span className={`font-bold text-lg ${color}`}>{project?.status}</span>
                  </li>
                  <li>
                      <Link className="font-bold text-lg text-[#1C8DDD]" href={`/message/project/${project?.projectId}`}>View</Link>
                  </li>
              </ul>
          </div>
         
      </div>
        </div>
    );
};

export default ClientCard;