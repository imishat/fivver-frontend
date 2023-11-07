import { useCreateNotifications } from "@/components/queries/mutation/notifications.mutation";
import { useUpdateMessage } from "@/components/queries/mutation/updateMessage.mutation";
import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import { useGetProject } from "@/components/queries/query/project.query";
import { messageData } from "@/components/redux/features/message/messageSlice";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { BsReply } from "react-icons/bs";
import { CgCheck } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import ImageModal from "../MessageImage/ImageModal";
import ImageDownloader from "./ImageDownloader";
import {AiOutlineCloudDownload } from "react-icons/ai";
function MessageDelivery({ message, setReply, update, setUpdate }) {
  console.log(message?.sourceFiles)
  // get user
  const { user } = useSelector((state) => state.user);

  // update 
  const messageUpdate = useSelector(state=>state.update)

  // get project by id
  const { data: projectData } = useGetProject({
    status: "",
    search: "",
    projectId: message?.projectId,
  });
  const project = projectData?.data?.project;

  const dispatch = useDispatch();



  // update project
  const { mutate: updateProject } = useUpdateProject();

  // update message
  const { mutate: updateMessage } = useUpdateMessage();

  // toast
  const { showToast, Toast } = useToast();
  // kb convert
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Kb", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // auto zip downloader
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const downloadResourcesOnClick = () => {
   
  };

  // image id
  const handleSetImageIdInLocal = (id) => {
    if (id) {
      typeof window !== "undefined" && localStorage.setItem("imageId", id);
    }
  };

  // image id
  const handleSetMessageIdInLocal = (id) => {
    if (id) {
      typeof window !== "undefined" && localStorage.setItem("messageId", id);
    }
  };

  const nowUTC = new Date(Date.now());

  // Add 6 hours
  nowUTC.setUTCHours(nowUTC.getUTCHours() + 6);
  
  
  
    const deadline = nowUTC.toISOString()
  
  /// handle update project track
  const handleUpdateProject = (data) =>{
    const track = (data === 'accept') ? 5:4
    const status = (data === 'accept') ? 'Completed':'Revision'
    const projectData = {
      id:project?.projectId,
      track:track,
      status:status,
      categoryId:project?.categoryId,
      subcategoryId:project?.subcategoryId,
    }
    updateProject(projectData,{
      onSuccess: (res) => {
        dispatch(updateState(!messageUpdate?.update))
        showToast("Delivery Success", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
      },
    })
  }



  // handle user action
  const handleAction = (data) => {
    const acceptData = {
      id: message?.messageId,
      delivery: data,
    };

    updateMessage(acceptData, {
      onSuccess: (res) => {
         handleUpdateProject(data)        
        showToast(`${data==='accept'?'Delivery Accepted':'Revision Send'}`, "success");
         dispatch(updateState(!messageUpdate?.update))
         handleCreateNotifications(data)
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        dispatch(updateState(!messageUpdate?.update))
      },
    });
  };

  
  const isForAdmin = user?.role === 'ADMIN' ? false:true
   // create notification
   const {mutate: createNotification} = useCreateNotifications()
   // handle create notifications
   const handleCreateNotifications  = (data) =>{
     const notificationData = {
       "type": "project",
       "model":"delivery",
       "message": data,
       "image": {fileId:project?.featuredImageId||project?.imageIds[0]},
       "isForAdmin":isForAdmin,
       "userId": project?.startedBy,
       "isRead":false,
       "projectId": project?.projectId
   }
   createNotification(notificationData,{
     onSuccess: (res) => {
       console.log(res.data);
     },
     onError: (err) => {
       showToast(err?.response?.data?.message);
     },
   })
   }

  const [messageIdClick, setMessageIdClick] = useState({});

  return (
    <div>
      <Toast />
      {/* delivery type */}
      <div>
        <div className="w-1/2 mx-auto my-6">
          <h1 className="text-2xl font-bold text-blue-400 uppercase text-center">
            First Delivery
          </h1>
          <p>
            If You don't accept this delivery, this project will automatically
            complete within the next 2 days
          </p>
        </div>
      </div>
      <div className="flex w-full px-2 gap-2 py-3">
        <div className="w-9 relative">
        
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
              {message?.sender?.userId === user?.userId
                ? "Me"
                : message?.sender?.fullName}
            </Link>

            <span className="text-xs pl-2 font-normal">
              {/* Apr 22, 2023, 7:33 PM */}
              {moment(message?.createdAt).calendar()}
            </span>
          </strong>
          <div className="relative">
            {message?.reply?.messageId ? (
              <a
                href={`#${message?.reply?.messageId}`}
                className="p-1 px-3 bg-base-200 top-0 z-0 text-xs relative rounded-full"
              >
                {message?.reply?.reply?.slice(0, 55)}{" "}
                <span>{message?.reply?.reply?.length > 55 ? "..." : ""}</span>{" "}
              </a>
            ) : (
              ""
            )}

            <p
              id={message?.messageId}
              className={`text-sm bg-base-100   gap-2 ${
                message?.reply ? "mt-0" : ""
              }`}
            >
              {message?.content}
              {/* Files */}
              <div className="w-full">
                <div className="mt-5 flex gap-5 ">
                  {/* Preview */}
                  <div className="w-[60%]">
                    <div className="">
                      <div>
                        <h2 className="text-lg font-bold ">Preview Image</h2>
                      </div>

                      <label
                        onClick={() => {
                          handleSetImageIdInLocal(message?.thumbnail?.fileId);
                          handleSetMessageIdInLocal(message?.messageId);
                          dispatch(messageData(message))
                        }}
                        htmlFor="image_modal"
                        className="relative"
                      >
                        {" "}
                        <img
                          className="w-full object-cover h-96"
                          src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.thumbnail?.fileId}`}
                          alt=""
                        />
                          <div className="absolute left-0 top-0 px-2 m-1 py-0 backdrop-blur-lg rounded-full border">{message?.comments?.length} Comments</div>
                      </label>
                    </div>
                    <div>
                      {/* Download Button */}
                      <div className="flex justify-center my-6">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.thumbnail?.fileId}`}
                          target="_blank"
                          className=" px-8 py-1 rounded-full cursor-pointer border border-gray-500"
                        >
                          {loading ? "Processing" : "Download"}
                        </Link>
                      </div>
                      {/* Accept and Revision Button */}
                      <p>
                        This watermark will no longer show after accepting the
                        delivery file. Please accept your final file first, then
                        download the files.
                      </p>
                      {/* User action */}
                      {
                        message?.delivery === "revision" ? 
                        <div className={`flex justify-center mt-6 gap-6`}>
                          <button
                            className="px-6 py-1 rounded-full flex items-center gap-2 cursor-default bg-blue-400 text-white font-bold"
                          >
                            {
                              user?.role==='ADMIN' ? 'Request for revision':'Revision Send'
                            } <CgCheck size={24} />
                          </button>
                        </div>:''
                      }
                    {
                      user?.role==='ADMIN' ?
                     <div className={`flex ${message?.delivery === "accept" || message?.delivery === "revision" ? 'hidden':''} justify-center mt-6 gap-6`}>
                       <button
                      className="px-6 py-1 rounded-full bg-blue-400 text-white font-bold"
                    >
                     Project Delivered
                    </button>
                     </div>
                      :
                      <>
                      
                      {message?.delivery === "accept" ? (
                        <div className="flex justify-center mt-6 gap-6">
                          <button>
                            <ImageDownloader images={message?.sourceFiles} />
                            
                          </button>
                        </div>
                      ) : (
                        ''
                      )}

                      {
                        message?.delivery === 'accept' || message?.delivery==='revision' ?'':
                        (
                          <div className="flex justify-center mt-6 gap-6">
                          <button
                            onClick={() => handleAction("accept")}
                            className="px-6 py-1 rounded-full bg-blue-400 text-white font-bold"
                          >
                            Accept
                          </button>
                          <button hidden={project?.track===4}
                            onClick={() => handleAction("revision")}
                            className="px-6 py-1 rounded-full bg-gray-400 text-white font-bold"
                          >
                            Revision
                          </button>
                        </div>
                        )
                      }
                      </>
                    }
                    </div>
                  </div>
                  <div className="w-[40%]">
                    {/* Thumbnail / Preview Image */}
                    <div className="text-left mb-4  w-full">
                      <h2 className="text-lg font-bold ">Final Files</h2>
                    </div>
                    <div className="w-full font-semibold text-left text-ellipsis overflow-hidden">
                   
                      <div className='flex'>
                      <p className="font-semibold ">
                    
                        {message?.thumbnail?.originalFileName}
                        <span className="font-normal">
                          {" "}
                          ({formatBytes(message?.thumbnail?.fileSize)})
                        </span>
                      </p>
                      </div>
                    </div>
                    <hr className="my-6 border-gray-500 w-12 " />
                    {/* Source files */}
                    <div className="w-full">
                      {message?.sourceFiles?.map((file,i) => {
                        return (
                          <div key={i} className="w-full">
                            <p
                              key={file?.fileId}
                              className="font-semibold text-left text-ellipsis overflow-hidden"
                            >
                              <div className='flex flex'>
                              <p className=' text-blue-400 '>
                                < AiOutlineCloudDownload/> </p>
                                <p>{file?.originalFileName}</p>
                              </div>
                              <span className="font-normal">
                                {" "}
                                ({formatBytes(file?.fileSize)})
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="cursor-pointer p-1"
                onClick={() =>
                  setReply({
                    reply: message?.content,
                    messageId: message?.messageId,
                  })
                }
              >
                <BsReply />
              </span>
            </p>
          </div>
        </div>
      </div>
      <ImageModal project={project} update={update} setUpdate={setUpdate}
        messageId={message?.messageId}
        messageIdClick={messageIdClick}
      />
    </div>
  );
}

export default MessageDelivery;
