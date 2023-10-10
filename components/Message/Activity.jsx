import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowDownCircle, BsCheckLg, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import { useGetQuickResponse } from "../queries/query/getQuickResponse.query";
import useToast from "../utility/useToast";
// import CustomOfferModal from "./CustomOfferModal";
import dynamic from "next/dynamic";
// import EditModal from "./EditModal/EditModal";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Requirement from "../Project/Requirment/Requirment";
import { useUploadFile } from "../queries/mutation/fileUpload.mutation";
import { useGetMessagesById } from "../queries/query/getMessagesById.query";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import { useGetProject } from "../queries/query/project.query";
import CancelModal from "./CancelModal/CancelModal";
import ExtendDeliveryModal from "./ExtendDelivery/ExtendDeliveryModal";
import MessageCard from "./MessageCard";
import MessageDelivery from "./MessageDelivery/MessageDelivery";
import MessageFiles from "./MessageFiles/MessageFiles";
import MessageLike from "./MessageLike/MessageLike";
import OfferMessageCard from "./OfferMessageCard";
import ProjectCountDown from "./ProjectCountDown";
const CustomOfferModal = dynamic(() => import("./CustomOfferModal"), {
  ssr: false,
});
const EditModal = dynamic(() => import("./EditModal/EditModal"), {
  ssr: false,
});
const DeliveryModal = dynamic(() => import("./DeliveryModal/DeliveryModal"), {
  ssr: false,
});
const AllQuickResponse = dynamic(() => import("./QuickResponse/AllQuickResponse"), {
  ssr: false,
});



const Activity = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // toggle activity and page requirements
  const [toggle,setToggle] = useState('activity');

  // router
  const router = useRouter();
  const { projectId } = router.query;


  // get project b y id
  const { data: projectData } = useGetProject({
    projectId: projectId,
    search: "",
    status: "",
  });
  const project = projectData?.data?.project;
  
  // socket
  let authorization =
    `Bearer ${typeof window!=='undefined' && window.localStorage.getItem('accessToken')}`;

  let url = "ws://103.49.169.89:30912";
  const client = io(url, {
    path: "/realtime-messaging",
  });


  // get user
  const { user } = useSelector((state) => state.user);



  const [watermark, setWatermark] = useState(false);
  // image upload call
  const { mutate: sendFileData } = useUploadFile({ watermark });


  // scroll messages
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  // update messages
  const [update,setUpdate] = useState(false)
  // input value
  const [value, setValue] = useState("");

  // send value
  const [sendValue, setSendValue] = useState("");
  console.log(value, sendValue);
  // get quick response
  const { data: quickResponseData } = useGetQuickResponse({
    quickResponseId: "",
  });

  // toast
  const { Toast, showToast } = useToast();
  // console.log(quickResponseData);

  const quickResponses = quickResponseData?.data?.quickResponses;

  // modal id
  const [editId, setEditId] = useState("");

  // get quick response by id
  const { data: quickResponseDataId } = useGetQuickResponse({
    quickResponseId: editId,
  });
  const quickResponse = quickResponseDataId?.data?.quickResponse;
  //  console.log(quickResponseDataId)

  // get user by id
  const { data: userData } = useGetUserData({
    token: "",
    userId: project?.startedBy,
  });
  // user info
  const userInfo = userData?.data?.user;

  // ================= message send area ==============
  // Reply
  const [reply, setReply] = useState({});

  // handle send like
  const handleSendLike = () => {
    const sendLike = {
      type: "like",
      content: "👍",
      projectId: project?.projectId,
      reply: reply,
      userId: userInfo?.userId,
      receiverId: userInfo?.userId,
      userName: userInfo?.fullName,
    };

    // send
    client.send(JSON.stringify(sendLike));
    setUpdate(!update)
    setReply({})
    showToast('Liked','success')
  };

  // blob images for preview images
  let imagesBlobs = [];

  // images
  const [images, setImages] = useState([]);
  const imageData = Object?.values(images.target?.files || {});

  for (let i = 0; i < imageData?.length; i++) {
    imagesBlobs.push(imageData[i]);
  }
  // uploaded image ids
  const imageIds = [];

  // handle send message
  const handleSendMessage = async (data) => {
    // upload images
    // console.log(data);
    const photo = images.target?.files;
    if (photo?.length) {
      const photoData = new FormData();
      for (const p in photo) {
        photoData.append("files", photo[p]);
      }
      sendFileData(photoData, {
        onSuccess: (res) => {
          const images = res?.data?.files;
          showToast("Photo Uploaded", "success");
          for (const i in images) {
            imageIds.push(images[i].fileId);
          }
          // if upload images

          const sendMessage = {
            type: "file",
            projectId: project?.projectId,
            content: data?.messageData,
            reply: reply,
            files: imageIds,
            userId: project?.startedBy,
            receiverId: project?.startedBy,
            userName: userInfo?.fullName,
          };

          // send
          client.send(JSON.stringify(sendMessage));
          setUpdate(!update)
          reset()
          setReply({})
          setImages([])
          showToast('File Send','success')
          setValue('')
        },
        onError: (err) => {
          showToast(err?.response?.data?.message);
          // loading stop
        },
      });
    } else {
      // send normal message
      const sendMessage = {
        type: "normal",
        projectId: project?.projectId,
        content: data?.messageData,
        reply: reply,
        receiverId: project?.startedBy,
        userId: project?.startedBy,
      };
      // send
      client.send(JSON.stringify(sendMessage));
      setUpdate(!update)
      showToast('Message Send','success')
      reset();
      setReply({})
      setValue('')
    }
  };




  // get message by projectId
  const { data: messageData } = useGetMessagesById({
    projectId: projectId,
    userId: project?.startedBy,
    update:update
  });

  const messages = messageData?.data?.messages;


useEffect(()=>{
 
/**
 * @param {*} data 
 */


/**
 * @param {string} message 
 */
async function onMessageReceivedAsync(message) {
  console.log('received:', message);
  setUpdate(!update)
}

function onAuthorized() {
  console.log('connected to the server.');


 
}

function onConnected() {
  client.on('authorized', onAuthorized);
  client.emit('authorization', authorization);
}

client.on('connect', onConnected);

client.on('error', erroneousResponse => {
  erroneousResponse = JSON.parse(erroneousResponse);

  console.error(erroneousResponse);
});

client.on('disconnect', () => {
  // unregisters the listeners...
  client.off('authorized', onAuthorized);
  client.off('message', onMessageReceivedAsync);

  console.log('disconnected from the server.');
});


},[client])
  function dateDiffInDays(date1, date2) {
    // Convert both dates to milliseconds
    let date1_ms = new Date(date1).getTime();
    let date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
}


  return (
   <>
  
    <div className="md:flex gap-6 px-6">
    <Toast />
    <div className="w-full">
      <div className=" py-6 flex items-center gap-6 border-b border-gray-300 my-2">
        {/* Btns */}
        <button onClick={()=>setToggle('activity')} className={`uppercase font-bold ${toggle==='activity'?'text-blue-500 border-blue-500':'border-transparent'} border-b `}>
          Activity
        </button>
        <button onClick={()=>setToggle('requirements')} className={`uppercase font-bold ${toggle==='requirements'?'text-blue-500 border-blue-500':'border-transparent'} border-b `}>
          Page Requirements
        </button>
      </div>
      {/* Body */}
      {
         
          toggle==='activity'?
          <div className="w-full">
          <div className="h-14 w-full bg-[#EFEFEF] pl-4 flex items-center">
            {/* Top bar */}
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-between w-full items-center leading-4">
                <div>
                  <strong>{userInfo?.fullName}</strong>
                  <p className="text-xs">
                    Last seen 1 min ago | Local Time: {moment(new Date()).format('LLL')}
                  </p>
                </div>
                <div>
                 {
                  user?.role==='ADMIN' ?  <details className="dropdown dropdown-left md:dropdown-open md:dropdown-bottom">
                  <summary className="m-1 btn">
                    <BsThreeDotsVertical />
                  </summary>
                  <ul className="p-2 shadow dropdown-content z-[1] bg-base-100 rounded w-28">
                    <li className="w-20">
                      <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                        Star
                      </a>
                    </li>
                    <li className="w-20">
                      <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                        Block
                      </a>
                    </li>
                    <li className="w-20">
                      <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                        Unblock
                      </a>
                    </li>
                  </ul>
                </details>:''
                 }
                  {/* <button><BsThreeDotsVertical /></button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Message body */}
          <div className="overflow-y-auto h-auto max-h-[600px]">
           
            {/* Client */}
            {messages?.map((message) => {
              return (
               <>
                <div>
                <div  ref={ref}></div>
                  {/* // offer message */}
                  {message?.type === "normal" && (
                    <MessageCard
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                  {/* // Normal Message */}
                  {message?.type === "offer" && (
                    <OfferMessageCard
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                  {/* // like Message */}
                  {message?.type === "like" && (
                    <MessageLike
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                  {/* Files Message */}
                  {message?.type === "file" && (
                    <MessageFiles
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                  {/* Delivery Message */}
                  {message?.type=== 'delivery'&&
                <MessageDelivery setReply={setReply} key={message.messageId} message={message} />}
                 
                </div>
              
                </>
              );
            })}
            
  
           
          </div>
          {/* send box */}
          <div className="border border-gray-500 m-2 relative">
            {/* Scroll Down */}
          <button className="absolute right-5 -top-12" onClick={handleClick}><BsArrowDownCircle size={20} /></button>
            <div>
              <div>
                {/* Quick Response */}
             <AllQuickResponse setValue={setValue} value={value} />
              </div>
              <div className="my-2 relative">
                {/* If Reply Message */}
                <div className="">
                  {reply?.messageId ? (
                    <div className="mx-3 flex">
                      <span className="font-bold">Reply:</span>
                      <p className="flex rounded-full px-2 max-w-fit my-2 mx-2 bg-base-300 items-center gap-2 ">
                        {reply?.reply?.slice(0, 55)}{" "}
                        <span>{reply?.reply?.length > 55 ? "..." : ""}</span>{" "}
                        <span
                          onClick={() => setReply({})}
                          className="cursor-pointer"
                        >
                          <IoCloseCircleOutline color="#f77070" size={20} />
                        </span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* If File selected */}
                <div>
                  {imagesBlobs?.length ? (
                    <span className="font-bold">Files:</span>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center flex-wrap gap-1 mx-1 my-3">
                    {imagesBlobs?.length > 0
                      ? imagesBlobs?.map((image, i) => {
                          return (
                            <div key={i} className="flex relative">
                              <Image
                                width={80}
                                height={80}
                                src={window.URL.createObjectURL(image)}
                                className="w-20 h-20 rounded object-cover"
                                alt=""
                              />
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
                <form onSubmit={handleSubmit(handleSendMessage)}>
                  <div className="w-full">
                    <textarea
                      {...register("messageData", { required: true })}
                      defaultValue={value}
                      id="sendbox"
                      className="w-full textarea textarea-bordered rounded-none"
                    ></textarea>
                  </div>
                  <div className="flex items-center ">
                    {/* Like */}
                    <span
                      onClick={() => handleSendLike()}
                      className="w-14 text-xl cursor-pointer flex justify-center"
                    >
                      👍
                    </span>
                    <span className="pr-5 pl-3">|</span>
                    <span className="flex w-full gap-6 items-center">
                      {/* Files */}
                      <label className="cursor-pointer">
                        <MdAttachment size={24} />
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={(e) => setImages(e)}
                        />
                      </label>
                      {/* Offer */}
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          document.getElementById("custom_offer").showModal()
                        }
                      >
                        {" "}
                        Create an offer
                      </span>
                    </span>
                    {/* send */}
                    <button className="w-20 px-4 font-bold text-blue-400">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        :
        <Requirement project={project} />
      }
    
    </div>
    {/* Right side */}
    <div className="md:w-4/12 my-6 space-y-6">
      {/* Timer */}
      <div className="bg-blue-50 p-2 px-4">
        <h2 className="text-xl font-bold">Time left to deliver</h2>

        {/* Countdown */}
        <div className="flex items-center">
          {/* <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
            {" "}
            01 <span>Days</span>
          </p>
          <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
            {" "}
            01 <span>Hours</span>
          </p>
          <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
            {" "}
            01 <span>Minutes</span>
          </p>
          <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
            {" "}
            01 <span>Seconds</span> 
           </p> */}
           <ProjectCountDown />
        </div>
        <button
          onClick={() =>
            document.getElementById("modal_delivery").showModal()
          }
          className="bg-blue-500 w-full text-center py-1 font-bold text-lg text-white"
        >
          Deliver Now
        </button>
        <button onClick={()=>document.getElementById('extend_modal').showModal()} className="text-center py-3 flex justify-center w-full">
          Extend delivery date
        </button>
      </div>
      {/* Project Details */}
      <div className="bg-blue-50 p-2 px-4">
        <h2 className="text-xl font-bold">Project Details</h2>
        <div className="flex gap-2 bg-white p-2">
          {
            project?.imageIds?.length ?  <img
            className="w-20 h-16"
            src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${project?.imageIds?.[0]}`}
            alt=""
          />
          :
          <img  className="w-20 h-16" src="https://dummyimage.com/100x80/" alt="" />
          }
         
          <div className="">
            <p>{project?.title}</p>
            <p className="text-green-500 font-bold">{project?.status}</p>
          </div>
        </div>
        {/* Details */}
        <div className="pt-5">
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <p>Project by</p>
              <strong>{userInfo?.fullName}</strong>
            </li>
            <li className="flex items-center justify-between">
              <p>Quantity</p>
              <strong>{project?.quantity}</strong>
            </li>
            <li className="flex items-center justify-between">
              <p>Duration</p>
              {
                dateDiffInDays(project?.updatedAt,project?.deadline)? 
                <strong>{dateDiffInDays(project?.updatedAt,project?.deadline)} Days</strong>
                :
                <strong>
                  Not Determined
                </strong>
              }
            
            </li>
            <li className="flex items-center justify-between">
              <p>Project Started</p>
              <strong>{moment(project?.updatedAt).format('ll').split(' ').splice(0,2).join(' ')+ ' ' + moment(project?.updatedAt).format('LT')}</strong>
            </li>
            <li className="flex items-center justify-between">
              <p>Project Delivery</p>
              <strong>{moment(project?.deadline).format('ll').split(' ').splice(0,2).join(' ')+ ' ' + moment(project?.updatedAt).format('LT')}</strong>
            </li>
            <li className="flex items-center justify-between">
              <p>Total Price</p>
              <strong>${project?.totalCost}</strong>
            </li>
            <li className="flex items-center justify-between">
              <p>Project Number</p>
              <strong>#{project?.projectId}</strong>
            </li>
          </ul>
          <hr className="py-3 border-blue-400 my-3" />
        </div>
        {/* Track Project */}
        <div className="">
          <div className="pb-3">
            <h2 className="text-xl font-bold">Track Project</h2>
          </div>
          <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
            <span className="absolute bg-blue-500 p-2 h-5 w-5 rounded-full -left-2.5">
              <BsCheckLg
                size={16}
                className="absolute left-0.5 top-0.5"
                color="white"
              />
            </span>
            <p>Project Placed</p>
          </div>
          <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
            <span className="absolute bg-blue-500 p-2 h-5 w-5 rounded-full -left-2.5"></span>
            <p>Requirement Submitted</p>
          </div>
          <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
            <span className="absolute border border-gray-500 bg-blue-50 p-2 h-5 w-5 rounded-full -left-2.5"></span>
            <p>Project Running</p>
          </div>
          <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
            <span className="absolute border border-gray-500 bg-blue-50 p-2 h-5 w-5 rounded-full -left-2.5"></span>
            <p>Review Delivery</p>
          </div>
          <div className="relative ml-6 border-l border-blue-500 pl-4">
            <span className="absolute border border-gray-500 bg-blue-50 p-2 h-5 w-5 rounded-full -left-2.5"></span>
            <p>Complete Project</p>
          </div>
        </div>
      </div>
      {/* Project Cancel */}
      <div className="flex items-center bg-blue-50">
      <button className=" text-center py-4 px-4" onClick={()=>document.getElementById('cancel_modal').showModal()}>Cancel This Project</button>
      </div>
    </div>

    {/* Edit modal */}
    <EditModal quickResponse={quickResponse} />
    <ExtendDeliveryModal /> 
    <CancelModal />
    <CustomOfferModal update={update} setUpdate={setUpdate} setReply={setReply} reply={reply} project={project} />
    <DeliveryModal update={update} setUpdate={setUpdate} setReply={setReply} reply={reply} project={project} />
  </div>
   </>
  );
};

export default Activity;
