import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetNotifications } from "../queries/query/notifications.query";

function Notification() {
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)

    const {data:notificationData} = useGetNotifications({page})

    const notifications = notificationData?.data?.inquiries
    console.log(notifications);

      // Count
  const count = Math.ceil((notificationData?.data?.totalCount || 10 )/ 10)
    return (
        <div className="w-96">
<div className=" h-auto relative">
    <div className="bg-white py-3.5  max-w-sm mx-auto  ease-linear">
        <div className="w-full flex items-center justify-between">
            <span className="font-medium text-sm text-slate-400">New Notification</span>
        </div>
        {
           notifications?.map((notification,i)=>{
            console.log(notification);
                return notification?.type === 'project' && <>
                {/* Delivery */}
                {
                     ( notification?.model === 'delivery') && <Link href={`/message/project/${notification?.projectId}`} key={i} className={`flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-300'}`}>
                     <div className="relative flex flex-shrink-0 items-end">
                         <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>    
                        
                     </div>
                     <div className="ml-3 ">
                         <span className="font-semibold tracking-tight text-sm">Admin </span>
                         <span className="leading-none">send your delivery</span>
                         <p className=" leading-4 italic ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p>
                         <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
                     </div>
                 </Link>
                  
                }
                {/* Extend */}
                { ( notification?.model === 'extend') && <Link href={`/message/project/${notification?.projectId}`} key={i} className={`flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-300'}`}>
                    <div className="relative flex flex-shrink-0 items-end">
                        <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>    
                        {/* <span className="h-12 w-12 border-2 flex items-center justify-center border-blue-400 object-cover rounded-full">D</span> */}
                       
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-sm">Admin </span>
                        <span className="leading-none">Want to extend delivery date</span>
                        <p className=" leading-4 italic">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                        <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
                    </div>
                </Link>
                }
                {/* Cancel */}
                { ( notification?.model === 'cancel') && <Link href={`/message/project/${notification?.projectId}`} key={i} className={`flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-300'}`}>
                    <div className="relative flex flex-shrink-0 items-end">
                        <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>    
                        {/* <span className="h-12 w-12 border-2 flex items-center justify-center border-blue-400 object-cover rounded-full">D</span> */}
                       
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-sm">Admin </span>
                        <span className="leading-none">Want to cancel this project</span>
                        <p className=" leading-4 italic  ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                        <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
                    </div>
                </Link>
                }
                {/* custom */}
                { ( notification?.model === 'custom') && <Link href={`/message/project/${notification?.projectId}`} key={i} className={`flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-300'}`}>
                    <div className="relative flex flex-shrink-0 items-end">
                        <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>    
                        {/* <span className="h-12 w-12 border-2 flex items-center justify-center border-blue-400 object-cover rounded-full">D</span> */}
                       
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-sm">Admin </span>
                        <span className="leading-none">Created a custom offer</span>
                        <p className=" leading-4 italic  ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                        <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
                    </div>
                </Link>
                }
                {/* message */}
                { ( notification?.model === 'message') && <Link href={`/message/project/${notification?.projectId}`} key={i} className={`flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-300'}`}>
                    <div className="relative flex flex-shrink-0 items-end">
                        <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>    
                        {/* <span className="h-12 w-12 border-2 flex items-center justify-center border-blue-400 object-cover rounded-full">D</span> */}
                       
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-sm">Admin </span>
                        <span className="leading-none">send a message</span>
                        <p className=" leading-4 italic  ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                        <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
                    </div>
                </Link>
                }
                
                </>
            
            })
        }
      
    </div>
</div>

        </div>
    );
}

export default Notification;