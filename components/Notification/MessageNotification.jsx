import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetNotifications } from "../queries/query/notifications.query";
import MessageNotifyCard from "./MessageNotifyCard";

function MessageNotification() {
  const messageUpdate = useSelector(state=>state.update)
    // user 
    const {user} = useSelector((state)=>state.user)
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)

    const {data:notificationData} = useGetNotifications({page,update:messageUpdate})

    const notifications = notificationData?.data?.inquiries
   

      // Count
  const count = Math.ceil((notificationData?.data?.totalCount || 10 )/ 10)
    return (
        <div className="w-[370px]">
<div className=" h-auto relative w-full">
    <div className="bg-white pt-3.5 max-w-sm mx-auto ease-linear w-full">
        <div className="w-full flex items-center justify-between">
            <span className="font-medium text-sm text-slate-400 w-full">Messages</span>
        </div>
        {
           notifications?.map((notification,i)=><MessageNotifyCard key={i} notification={notification} />)
        }
      <div>
        <Link href={`/message`} className="px-4 flex justify-center py-2 w-full border">See All Messages</Link>
      </div>
    </div>
</div>

        </div>
    );
}

export default MessageNotification;