import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCheckCircleFill, BsReply } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAction } from "../queries/mutation/delete.mutation";
import { useUpdateMessage } from "../queries/mutation/updateMessage.mutation";
import { useUpdateProject } from "../queries/mutation/updateProject.mutation";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";

function OfferMessageCard({message,setReply,project}) {

  const router = useRouter()
  const {projectId} = router?.query

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

// update project
const {mutate:updateProject} = useUpdateProject()
const {mutate:updateMessage} = useUpdateMessage()

// deadline get 
const nowUTC = new Date();

const hoursToAdd = 24 * parseInt(message?.delivered);

// Add 6 hours
nowUTC.setUTCHours((nowUTC.getUTCHours()* hoursToAdd) );   
const deadline = nowUTC?.toISOString();
console.log(nowUTC)
// update project
const handleUpdateProject = (id) =>{
  const projectData = {
    id: id,
    status:'Progress',
    track:1,
    title:message?.categoryName,
    categoryId: project?.categoryId,
    subcategoryId: project?.subcategoryId,
    deadline:deadline,
    totalCost:message?.price,
    imageIds:[message?.imageId,...project?.imageIds]
  }
  updateProject(projectData,{
    onSuccess:(res)=>{
      console.log(res)
      dispatch(updateState(!messageUpdate?.update))
      router.reload()
    },
    onError:(err)=>{
      console.error(err);
    }
  })
}


// handle accept custom offer
const handleCustomOfferAccept  = (id)=>{
  const messageData = {
    id:id,
    action:'accept'
  }
  updateMessage(messageData,{
    onSuccess:(res)=>{
      showToast(`Offer Accepted' }`, "success");
      handleUpdateProject(projectId)
        dispatch(updateState(!messageUpdate?.update))
    },
    onError:(err)=>{
      showToast(err?.message);
    }
  })
}

// handle reject custom offer
const handleCustomOfferReject  = (id)=>{
  console.log(id)
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
           <Link href={`/user/${message?.sender?.senderId}`}> {
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
                 <>{

                   message?.action ==='accept' || message?.action ==='cancelled' ?'':
                <button onClick={()=>handleWithdraw(message?.messageId)} className={`w-full bg-blue-500 text-white font-bold py-2  ${isLoading && 'animate-pulse'}`}>Withdraw Offer </button>
              }
               {
                  message?.action ==='accept'&& <div className="w-full flex justify-center px-5 pb-3">
                    <button o className="bg-blue-500 text-white px-5 font-bold py-2">Accepted</button>
                    </div>
                }
                {
                  message?.action ==='cancelled'&& 
                  <div className="flex justify-center w-full">
                    <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancelled</button>
                  </div>
                }
                </>
                :
                <>
                {
                  message?.action ==='accept'&& <div className="w-full flex justify-center px-5 pb-3">
                    <button o className="bg-blue-500 text-white px-5 font-bold py-2">Accepted</button>
                    </div>
                }
                {
                  message?.action ==='cancelled'&& 
                  <div className="flex justify-center w-full">
                    <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancelled</button>
                  </div>
                }
                {
                  message?.action ==='accept' || message?.action ==='cancelled' ?'':
                  <div className="w-full flex justify-between px-5 pb-3">
                <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancel</button>
                <button onClick={()=>handleCustomOfferAccept(message?.messageId)} className="bg-blue-500 text-white px-5 font-bold py-2">Accept</button>
                </div>
                }
                

                </>
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