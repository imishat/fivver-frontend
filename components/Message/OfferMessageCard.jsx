import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircleFill, BsReply } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAction } from "../queries/mutation/delete.mutation";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";

function OfferMessageCard({message,setReply}) {

  const dispatch = useDispatch()
  // get update with redux
  const messageUpdate = useSelector((state) => state.update);

  const {mutate:deleteMessage,isLoading} = useDeleteAction()
// get user 
const {user} = useSelector(state => state.user)

// Toast 
const {Toast,showToast} = useToast()



const handleWithdraw = (id) =>{
  const deleteData ={
    id:id,
    type:'messages'
  }
  deleteMessage(deleteData,{
    onSuccess: (res) => {
      console.log(res);
      showToast("Withdraw Offer", "success");
      dispatch(updateState(!messageUpdate?.update))
    },
    onError: (err) => {
      showToast(err?.message);
    },
  })
}

return (
        <div className="flex w-full px-2  gap-2 py-3">
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
           <Link href={`/user/${message?.sender?.userId}`}> {
              (message?.sender?.userId===user?.userId ? 'Me': message?.sender?.fullName)
            }</Link>
           
            <span className="text-xs pl-2 font-normal">
              {/* Apr 22, 2023, 7:33 PM */}
              {moment(message?.createdAt).calendar()}
            </span>
          </strong>
        <div className="relative">
          {
            message?.reply?.messageId ? <a href={`#${message?.message?.reply?.messageId}`} className="p-1 px-3 bg-base-200 top-0 z-0 text-xs relative rounded-full">{message?.reply?.reply?.slice(0,55)} <span>{message?.message?.reply?.reply?.length > 55 ? '...':''}</span>  </a>:''
          }
           
           <div className="max-w-md bg-blue-50 h-full">
            {/* Offer image */}
            <div className="flex bg-blue-200 items-center justify-between p-3">
                <Image height={100} width={100} className="w-14 object-cover h-14 border p-1 border-gray-400" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${message?.imageId}`} alt="" />
                {/* Offer title */}
                <h2 className="text-xl font-bold">{message?.categoryName}</h2>
                {/* Offer Price */}
                <p className="text-3xl font-bold text-blue-500">${message?.price}</p>
            </div>
            {/* Offer Body */}
            <div>
                <p className="p-3">{message?.message}</p>
                    <ul className="mt-6 mx-3">
                        <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.delivered} Day Delivery</li>
                        <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.categoryName}</li>
                    </ul>
            </div>
            {/* Offer Button */}
            <div className=" w-full mt-4">
               {
                user?.role ==='ADMIN'?
                <button onClick={()=>handleWithdraw(message?.messageId)} className={`w-full bg-blue-500 text-white font-bold py-2  ${isLoading && 'animate-pulse'}`}>Withdraw Offer </button>
                :
                <div className="w-full flex justify-between px-5 pb-3">
                <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancel</button>
                <button className="bg-blue-500 text-white px-5 font-bold py-2">Accept</button>
                </div>
               }
                
            </div>
           </div>
        <p id={message?.messageId} className={`text-sm bg-base-100  flex items-center gap-2 ${message?.reply? 'mt-0':''}`}>
           {/* {message?.message} */}
          <span className="cursor-pointer p-1" onClick={()=>setReply({reply:message?.message,messageId:message?.messageId})}><BsReply /></span>
          </p>
        </div>
        </div>
      </div>
    );
}

export default OfferMessageCard;