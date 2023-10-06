import { useGetUserData } from "@/components/queries/query/getUserProfile.query";
import moment from "moment";
import Link from "next/link";
import { BsReply } from "react-icons/bs";
import { useSelector } from "react-redux";

function MessageLike({message,setReply}) {
      // get user 
const {user} = useSelector(state => state.user)
// get user by id
const {data:userData} = useGetUserData({token:'',userId:message?.userId})
const userInfo = userData?.data?.user
    return (
        <div className="flex w-full px-2 gap-2 py-3">
        <div className="w-9">
          <img
            className="w-8 h-8 rounded-full border border-gray-500"
            src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${message?.sender?.profilePicture}`} 
            alt=""
          />
        </div>
        <div className="w-full">
          <strong>
          {/* (message?.userId===user.userId ? 'Me':userInfo?.fullName) */}
          <Link href={`/user/${message?.sender?.userId}`}>
            {
              (message?.sender?.userId===user?.userId ? 'Me': message?.sender?.fullName)
            }
            </Link>
           
            <span className="text-xs pl-2 font-normal">
              {/* Apr 22, 2023, 7:33 PM */}
              {moment(message?.createdAt).calendar()}
            </span>
          </strong>
        <div className="relative">
          {
            message?.reply?.messageId ? <a href={`#${message?.reply?.messageId}`} className="p-1 px-3 bg-base-200 top-0 z-0 text-xs relative rounded-full">{message?.reply?.reply?.slice(0,55)} <span>{message?.reply?.reply?.length > 55 ? '...':''}</span>  </a>:''
          }
           
        <p id={message?.messageId} className={`text-sm bg-base-100  flex items-center gap-2 ${message?.reply? 'mt-0':''}`}>
            <span className="text-5xl">
           {message?.content}
            </span>
                
          <span className="cursor-pointer p-1" onClick={()=>setReply({reply:message?.content,messageId:message?.messageId})}><BsReply /></span>
          </p>
        </div>
        </div>
      </div>
    );
}

export default MessageLike;