

import { useDeleteAction } from "@/components/queries/mutation/delete.mutation";
import { useUpdateMessage } from "@/components/queries/mutation/updateMessage.mutation";
import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import { useGetProject } from "@/components/queries/query/project.query";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsReply } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function ExtendMessage({message,setReply}) {
  console.log(message)

  const dispatch = useDispatch()
    // get update with redux
    const messageUpdate = useSelector((state) => state.update);

    const router = useRouter()
    const {projectId} = router.query

  const {data:singleProject} = useGetProject({projectId:projectId,status:'',search:''})
const project = singleProject?.data?.project
  // delete message 
  const {mutate:deleteMessage} = useDeleteAction()
// get user 
const {user} = useSelector(state => state.user)

// toast
const {Toast,showToast} = useToast()

const [id,setId] = useState('')

// handle extend date
const handleDeleteExtendDate = () =>{
  const deleteData ={
    id:id,
    type:'messages'
  }
  deleteMessage(deleteData,{
    onSuccess: (res) => {
      console.log(res);
      showToast("Cancel Extend", "success");
      dispatch(updateState(!messageUpdate?.update))
    },
    onError: (err) => {
      showToast(err?.message);
    },
  })
}




const dateStr = project?.deadline

// Convert to Date object
const dateObj = new Date(dateStr);

// Add 1 day (24 hours)
dateObj.setUTCDate(dateObj.getUTCDate() + parseInt(message?.days));

// Display the updated date
const futureDate = dateStr?.length && dateObj?.toISOString()





/// handle handleUpdateMessage
const {mutate: updateMessage} = useUpdateMessage()


const handleUpdateMessage = () =>{
  console.log(message?.messageId)
  const messageData = {
    id: message?.messageId,
    action:'accepted'
  }
  updateMessage(messageData,{
    onSuccess: (res) => {
      console.log(res);
      showToast("Accept Success", "success");
      dispatch(updateState(!messageUpdate?.update))
    },
    onError: (err) => {
      showToast(err?.message);
    },
  })
}

// handle cancel extend date
const handleCancelExtendMessage = () =>{
  console.log(message?.messageId)
  const messageData = {
    id: message?.messageId,
    action:'canceled'
  }
  updateMessage(messageData,{
    onSuccess: (res) => {
      console.log(res);
      showToast("Cancel Extend", "success");
      dispatch(updateState(!messageUpdate?.update))
    },
    onError: (err) => {
      showToast(err?.message);
    },
  })
}

console.log(parseInt(project?.totalCost) + parseInt(message?.amount))
  // update project
  const {mutate:updateProject,isLoading} = useUpdateProject()

// handle accept extend 
const handleExtendDate = () =>{
 const updateData = {
  id:projectId,
  categoryId:project?.categoryId,
  subcategoryId:project?.subcategoryId,
  deadline: futureDate,
  track:2,
  status:'Progress',
  totalCost: parseInt(project?.totalCost) + parseInt(message?.amount)
 }
 updateProject(updateData,{
  onSuccess: (res) => {
    console.log(res);
    showToast("Accept Extend", "success");
    dispatch(updateState(!messageUpdate?.update))
    router.reload()
    handleUpdateMessage()
  },
  onError: (err) => {
    showToast(err?.message);
  },
})
}

return (
        <div className="flex w-full px-2  gap-2 py-3 relative">
          <Toast />
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
                {/* days */}
                <h2 className="text-xl font-bold">{message?.days} Days</h2>
                {/* Offer title */}
                <h2 className="text-xl font-bold">Extend Date</h2>
                {/* Offer Price */}
                <p className="text-3xl font-bold text-blue-500">${message?.amount}</p>
            </div>
            {/* Offer Body */}
            <div className="my-4 px-1">
              <p>{message?.message}</p>
            </div>
            {/* <div>
                <p className="p-3">{message?.message}</p>
                    <ul className="mt-6 mx-3">
                        <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.delivered} Day Delivery</li>
                        <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.categoryName}</li>
                    </ul>
            </div> */}
            {/* Offer Button */}
            <div className=" w-full mt-4">
               {
                user?.role ==='ADMIN'?
                  <>
                  {  message?.action === 'accepted' ?   <div className="w-full flex justify-center px-5 pb-3">
                    <button className="bg-blue-500 text-white px-6 rounded-full font-bold py-2">Accepted</button>
                    </div>
                    :
                      ''}
                  {  message?.action === 'canceled' ?   <div className="w-full flex justify-center px-6 rounded-full pb-3">
                      <button className="bg-gray-400 text-white px-5 font-bold py-2">Canceled</button>
                      </div>
                    :
                      ''}

               {message?.action === 'accepted'  || message?.action === 'canceled' ? '':
                  <div className="w-full flex justify-between px-5 pb-3">
                   <button className="w-full bg-blue-500 text-white font-bold py-2 " onClick={()=>{
                  setId(message?.messageId)}}>Cancel Extend Time</button>
                  </div>
               }       
               </>
                :
               <>
                  {  message?.action === 'accepted' ?   <div className="w-full flex justify-center px-5 pb-3">
                    <button className="bg-blue-500 text-white px-6 rounded-full font-bold py-2">Accepted</button>
                    </div>
                    :
                      ''}
                  {  message?.action === 'canceled' ?   <div className="w-full flex justify-center px-6 rounded-full pb-3">
                      <button className="bg-gray-400 text-white px-5 font-bold py-2">Canceled</button>
                      </div>
                    :
                      ''}

               {message?.action === 'accepted'  || message?.action === 'canceled' ? '':
                  <div className="w-full flex justify-between px-5 pb-3">
                  <button onClick={()=>handleCancelExtendMessage()} className="bg-gray-400 text-white px-5 font-bold py-2">Cancel</button>
                  <button onClick={()=>handleExtendDate()} className="bg-blue-500 text-white px-5 font-bold py-2">Accept</button>
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
        { id?.length ?
          <div className="w-96 fixed left-[20%] z-50 p-3 top-1/2 rounded-md bg-base-100 border-2 items-center flex justify-center">
            <div className="w-96 h-full">
            <div>
              <h2 className="text-xl font-bold">Extend Date</h2>
              <p className="my-4">Confirm to cancel extend date</p>
            </div>
           
            <div className="flex items-center justify-between">
              <button onClick={()=>setId("")} className="btn btn-sm btn-error rounded-none text-white">Cancel</button>
              <button onClick={()=>handleDeleteExtendDate()} className="btn btn-sm btn-success rounded-none text-white">Confirm</button>
            </div>
            </div>
          </div>:''
        }
      </div>
    );
}

export default ExtendMessage;

