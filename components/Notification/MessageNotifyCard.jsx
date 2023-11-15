import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetUserData } from "../queries/query/getUserProfile.query";

function MessageNotifyCard({notification}) {
     // user 
     const {user} = useSelector((state)=>state.user)

     // get user by id
     const {data:userData} = useGetUserData({userId:notification?.userId})
     const userInfo = userData?.data?.user
     console.log(userInfo)
    return (   <>
        {/* message */}
        { ( notification?.model === 'message' && notification?.type === 'message' && user?.role !=='ADMIN') && <Link href={`${notification?.projectId ? '/message/project/':'/message/' }${notification?.projectId||notification?.userId}`} className={`${user?.userId===notification?.userId || 'hidden' } flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-200'}`}>
            <div className="relative flex flex-shrink-0 items-end">
                <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>
                </div>
        <div className="ml-3">
                <span className="font-semibold tracking-tight text-sm">Admin </span>
                <span className="leading-none">send a message</span>
                <p className=" leading-4 italic  ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
            </div>
        </Link>
        }

         {/* message admin */}
         { ( notification?.model === 'message' && notification?.type === 'message' && user?.role ==='ADMIN' && notification?.isForAdmin) && <Link href={`${notification?.projectId ? '/message/project/':'/message/' }${notification?.projectId||notification?.userId}`} className={`${user?.userId!==notification?.userId || 'hidden' } flex px-5 items-center hover:shadow border-b border-gray-400 rounded-lg py-1 cursor-pointer ${notification?.isRead ? '':'bg-base-200'}`}>
            <div className="relative flex flex-shrink-0 items-end">
                <Image height={66} width={66} className="h-12 w-12 border-2 border-blue-400 object-cover rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${notification?.image?.fileId}`}/>
            </div>
            <div className="ml-3">
                <span className="font-semibold tracking-tight text-sm">{userInfo?.fullName} </span>
                <span className="leading-none">send a message</span>
                <p className=" leading-4 italic  ">{notification?.message ? `"${notification?.message?.split(' ').slice(0,6).join(' ')}"`:''}</p> 
                <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{moment(notification?.createdAt).fromNow()}</span>
            </div>
        </Link>
        }
        </>
    );
}

export default MessageNotifyCard;