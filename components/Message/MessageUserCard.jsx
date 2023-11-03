import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsClock, BsStar, BsStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUser } from "../queries/mutation/updateUser.mutation";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";

function MessageUserCard({message,lastMessage,messageId}) {
            // get user 
const {user} = useSelector(state => state.user)

const {messageUpdate} = useSelector(state=>state.update)

  // dispatch 
  const dispatch = useDispatch()

  // const { data: messageData } = useGetMessagesById({
  //   projectId: "",
  //   userId: messageId,
  //   update:messageUpdate?.update
  // });



     // get user by id
  const { data: userData } = useGetUserData({ token: "", userId: message?.userId,update:messageUpdate?.update });
  // user info
  const userInfo = userData?.data?.user;

  // toast 
  const {Toast,showToast} = useToast()

  // loading
  const [loading,setLoading] = useState(false)
  // update user
  const {mutate:updateUser} = useUpdateUser()
  // handle star
  const handleStar = () =>{
    setLoading(true)
    const action={
      star:!userInfo?.star,
      action:'aaaa',
    }
    updateUser(action,{
      onSuccess: (res) => {
        showToast(`${!userInfo?.star ? 'Star Added':'Star Removed' }`, "success");
        setLoading(false)
        dispatch(updateState(!messageUpdate?.update))
      },
      onError: (err) => {
        setLoading(false)
        showToast(err?.message);
      },
    })  
  }

  
    return (
      <>
      <div className={` flex items-center w-full relative`} >
       
        <Link className="w-full" href={`/message/${message?.receiver?.receiverId}`}>
        <Toast />
        <li key={message?.messageId} className="flex pr-9 items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
        <span className="w-12">
          {
            message?.receiver?.profilePicture ? <Image width={96} height={96}
            className="w-9 h-9 object-cover rounded-full"
            src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.receiver?.profilePicture}`}
            alt=""
          />:<div className="bg-rose-100 w-9 h-9 object-cover rounded-full flex justify-center items-center font-bold">{message?.receiver?.fullName?.slice(0,1)}</div>
          }
          
        </span>
        <div className="w-full leading-5">
          <div className="flex justify-between items-center w-full">
            <strong className="flex items-center gap-2">
              {message?.receiver?.fullName}
              <span>
                <BsClock />
              </span>
            </strong>
            <span className="text-[13px]">{moment(lastMessage?.createdAt).fromNow()}</span>
          
          </div>
          <p className="text-[13px]">{lastMessage?.content}</p>
        </div>
      </li>
      </Link>
       {/* Handle Star */}
     {
      user?.role === 'ADMIN' ?   <span className={`cursor-pointer absolute right-0 hover:bg-base-300 rounded-full px-1 py-2 flex items-center justify-center w-8 ${loading?'animate-pulse':''}`} onClick={()=>handleStar()}>
             
      {
       userInfo?.star ? <BsStarFill />:<BsStar />
      } 
     </span>:''
     }
      </div>
      </>
    );
}

export default MessageUserCard;