import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAction } from "../queries/mutation/delete.mutation";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";

function MessageCard({message,setReply}) {
      // get user 
const {user} = useSelector(state => state.user)
// get user by id
const {data:userData} = useGetUserData({token:'',userId:message?.userId})
const userInfo = userData?.data?.user

const dispatch = useDispatch()

const messageUpdate = useSelector((state)=>state.update)

  // This is the specific date from which you want to start the timer
  const specificDate = new Date(message?.createdAt); // Example date - replace with your desired date

  // State to hold whether data is visible
  const [isVisible, setIsVisible] = useState(true);

  const {showToast,Toast} = useToast()

  useEffect(() => {
    // Function to check if 5 minutes have passed
    const checkTime = () => {
      const currentTime = new Date();
      const timeDifference = currentTime - specificDate;
      if (timeDifference > 5 * 60 * 1000) {  // 5 minutes in milliseconds
        setIsVisible(false);
      }
    };



    const interval = setInterval(checkTime, 1000);  // Check every second

    // Cleanup: clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [specificDate]);

  // delete
  const {mutate:deleteMessage} = useDeleteAction()

  // handle delete 
  const handleDelete = (id) =>{

    const deleteData = {
      id:id,
      type:'messages'
    }
    deleteMessage(deleteData,{
      onSuccess: (res) => {
        showToast(`Message Deleted' }`, "success");
        dispatch(updateState(!messageUpdate?.update))
      },
      onError: (err) => {
        showToast(err?.message);
      },
    })
  }

    return (
        <div className="flex w-full px-2 gap-2 py-3">
          <Toast />
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
           
        <p id={message?.messageId} className={`text-sm bg-base-100  flex items-center gap-2 ${message?.reply? 'mt-0':''}`}>
           {message?.content}
          <span className="cursor-pointer p-1" onClick={()=>setReply({reply:message?.content,messageId:message?.messageId})}><BsReply /></span>
          {/* delete message */}
          {isVisible && message?.createdAt ? <span className="cursor-pointer p-2" onClick={()=>handleDelete(message?.messageId)}><MdOutlineDelete size={16} /></span>:''}
          </p>
        </div>
        </div>
      </div>
    );
}

export default MessageCard;