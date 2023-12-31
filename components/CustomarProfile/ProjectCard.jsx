import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountDown from "../Dashboard/CountDown";
const ProjectCard = ({project}) => {



 // date  convert
 const [time, setTime] = useState('');

 useEffect(() => {
   // Original creation time
   const createTime = new Date(project?.createdAt);
 
   
   const currentTime = new Date();
 
  
   const timeDifference = currentTime - createTime;
 
 
   const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
 
   if (hoursAgo >= 24) {
     const daysAgo = Math.floor(hoursAgo / 24);
     setTime(daysAgo + " day" + (daysAgo > 1 ? "s" : "") + " ago");
   } else {
     setTime(hoursAgo + " hour" + (hoursAgo > 1 ? "s" : "") + " ago");
   }
 }, []);
  const color = 
  project?.status==='Revision' && 'text-[#DF7138]' 
  || 
  project?.status==='Progress' && 'text-[#5c9961]'
  || 
  project?.status==='Pending' && 'text-[#7f3055]'
  || 
  project?.status==='Delivered' && 'text-[#9dcccd]'
  || 
  project?.status==='COMPLETED' && 'text-[#14591a]'
  ||
  project?.status==='Active' && 'text-[#DA560A]'

  console.log(project)
    return (
        <div className="border p-3 w-full ">
          <Link href={`/message/project/${project?.projectId}`}>
          
          <div className="flex gap-2">
                <Image height={56} width={56} src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${project?.imageIds[0]}`} className="h-14 bg-rose-200 w-20" alt="" />
              <div className="flex flex-col w-full">
              <p className="text-base">{project.title}</p>
                <p className="text-xl font-bold">${project.category?.at(0).price}</p>
              </div>
            </div>
            <div className="flex justify-between pt-2 items-center">
                <p><CountDown deadline={project?.deadline} project={project} /></p>
                <p className={`font-bold ${color}`}>{project.status}</p>
            </div>
          
          
          </Link>
        </div>
    );
};

export default ProjectCard;