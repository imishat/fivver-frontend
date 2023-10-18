

import { useDeleteAction } from "@/components/queries/mutation/delete.mutation";
import { useUpdateMessage } from "@/components/queries/mutation/updateMessage.mutation";
import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import { useGetProject } from "@/components/queries/query/project.query";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsReply } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function CancelMessage({message,setReply}) {


  const dispatch = useDispatch()
    // get update with redux
    const messageUpdate = useSelector((state) => state.update);

    // toast


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



// handle extend date
const handleDeleteExtendDate = (id) =>{
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









/// handle handleUpdateMessage
const {mutate: updateMessage} = useUpdateMessage()

 // update project
 const { mutate: updateProject, isLoading } = useUpdateProject();

 const handleUpdateProject = () =>{
    const updateData = {
     id:projectId,
     categoryId:project?.categoryId,
     subcategoryId:project?.subcategoryId,
     track:0,
     status:'Cancelled',
    }
    updateProject(updateData,{
     onSuccess: (res) => {
       console.log(res);
       dispatch(updateState(!messageUpdate?.update))
       router.reload()
     },
     onError: (err) => {
       showToast(err?.message);
     },
   })
   }

const handleUpdateMessage = () =>{
  console.log(message?.messageId)
  const messageData = {
    id: message?.messageId,
    action:'accepted'
  }
  updateMessage(messageData,{
    onSuccess: (res) => {
      console.log(res);
      handleUpdateProject()
      showToast("Accept Cancelation", "success");
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
      showToast("Cancel Cancelation", "success");
      dispatch(updateState(!messageUpdate?.update))
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
            <div className="flex bg-blue-200 items-center justify-center p-3">
                {/* days */}
                
                {/* Offer title */}
                <h2 className="text-xl font-bold">Cancel Project</h2>
              
            </div>
            {/* Offer Body */}
            <div className="my-4 px-1">
              <p>{message?.content}</p>
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
                    <button className="bg-blue-500 text-white px-6 rounded-full font-bold py-2">Project Canceled</button>
                    </div>
                    :
                      ''}
                  {  message?.action === 'canceled' ?   <div className="w-full flex justify-center px-6 rounded-full pb-3">
                      <button className="bg-gray-400 text-white rounded-full px-5 font-bold py-2">Project Not Canceled</button>
                      </div>
                    :
                      ''}

               {message?.action === 'accepted'  || message?.action === 'canceled' ? '':
                  <div className="w-full flex justify-between px-5 pb-3">
                   <button className="w-full bg-blue-500 text-white font-bold py-2 " onClick={()=>{handleDeleteExtendDate(message?.messageId)}}>Cancel Cancelation</button>
                  </div>
               }       
               </>
                :
               <>
                  {  message?.action === 'accepted' ?   <div className="w-full flex justify-center px-5 pb-3">
                    <button className="bg-blue-500 text-white px-6 rounded-full font-bold py-2">Project Canceled </button>
                    </div>
                    :
                      ''}
                  {  message?.action === 'canceled' ?   <div className="w-full flex justify-center px-6 rounded-full pb-3">
                      <button className="bg-gray-400 text-white px-5 font-bold py-2">Project Not Canceled</button>
                      </div>
                    :
                      ''}

               {message?.action === 'accepted'  || message?.action === 'canceled' ? '':
                  <div className="w-full flex justify-between px-5 pb-3">
                  <button onClick={()=>handleCancelExtendMessage()} className="bg-gray-400 text-white px-5 font-bold py-2">Cancel</button>
                  <button onClick={()=>handleUpdateMessage()} className="bg-blue-500 text-white px-5 font-bold py-2">Accept</button>
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

export default CancelMessage;

