import { useGetUserData } from "@/components/queries/query/getUserProfile.query";
import moment from "moment";
import Link from "next/link";
import { BsReply } from "react-icons/bs";
import { useSelector } from "react-redux";

function MessageStart({message,setReply}) {
      // get user 
const {user} = useSelector(state => state.user)
// get user by id
const {data:userData} = useGetUserData({token:'',userId:message?.userId})
const userInfo = userData?.data?.user
    return (
        <div className="flex w-full px-2 gap-2 py-3">
        <div className="w-9">
      {  message?.sender?.profilePicture ?  <img
            className="w-8 h-8 rounded-full border border-gray-500"
            src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.sender?.profilePicture}`} 
            alt=""
          />:<div className="bg-rose-100 w-9 h-9 object-cover rounded-full flex justify-center items-center font-bold">{message?.sender?.fullName?.slice(0,1)}</div>
          }
         
        </div>
        <div className="w-full">
          <strong>
          {/* (message?.userId===user.userId ? 'Me':userInfo?.fullName) */}
          <Link href={`/user/${message?.sender?.senderId}`}>
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
           
        <p id={message?.messageId} className={`text-sm bg-base-100  flex flex-col gap-2 ${message?.reply? 'mt-0':''}`}>
            <span className="text-">
          <span className="font-bold">Name</span>: {message?.name}
            </span>
            <span className="text-">
          <span className="font-bold">Email</span>: {message?.email}
            </span>
            <span className="text-">
          <span className="font-bold">Website</span>: {message?.website}
            </span>
            <span className="text-">
          <span className="font-bold">Favorite Design</span>: {message?.favoriteDesign}
            </span>
            <span className="text-">
          <span className="font-bold">Message</span>: {message?.content}
            </span>
                <div>
                  {
                    message?.designFile ? <img className="max-w-md" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${message?.designFile}`} alt="" />:''
                  }
                </div>
          <span className="cursor-pointer p-1" onClick={()=>setReply({reply:message?.content,messageId:message?.messageId})}><BsReply /></span>
          </p>
        </div>
        </div>
      </div>
    );
}

export default MessageStart;