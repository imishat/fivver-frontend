import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowDownCircle, BsCheckLg } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import useToast from "../utility/useToast";
// import CustomOfferModal from "./CustomOfferModal";
import dynamic from "next/dynamic";
// import EditModal from "./EditModal/EditModal";
import { useSocketChat } from "@/hooks/useSocketChat";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useUploadFile } from "../queries/mutation/fileUpload.mutation";
import { useCreateNotifications } from '../queries/mutation/notifications.mutation';
import { useSendMail } from '../queries/mutation/sendMail.mutate';
import { useGetMessagesById } from "../queries/query/getMessagesById.query";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import { useGetProject } from "../queries/query/project.query";
import { messagesState } from "../redux/features/message/allMessagesSlice";
import { updateState } from "../redux/features/update/updateSlice";



const Requirement = dynamic(() => import("../Project/Requirment/Requirment"), {
  ssr: false,
});
const CancelModal = dynamic(() => import("./CancelModal/CancelModal"), {
  ssr: false,
});
const CancelMessage = dynamic(() => import("./Card/CancelMessage/CancelMessage"), {
  ssr: false,
});
const ExtendMessage = dynamic(() => import("./Card/ExtendMessage/ExtendMessage"), {
  ssr: false,
});
const ExtendDeliveryModal = dynamic(() => import("./ExtendDelivery/ExtendDeliveryModal"), {
  ssr: false,
});
const MessageCard = dynamic(() => import("./MessageCard"), {
  ssr: false,
});
const MessageDelivery = dynamic(() => import("./MessageDelivery/MessageDelivery"), {
  ssr: false,
});
const MessageFiles = dynamic(() => import("./MessageFiles/MessageFiles"), {
  ssr: false,
});
const OfferMessageCard = dynamic(() => import("./OfferMessageCard"), {
  ssr: false,
});
const ProjectCountDown = dynamic(() => import("./ProjectCountDown"), {
  ssr: false,
});

const CustomOfferModal = dynamic(() => import("./CustomOfferModal"), {
  ssr: false,
});
const EditModal = dynamic(() => import("./EditModal/EditModal"), {
  ssr: false,
});
const DeliveryModal = dynamic(() => import("./DeliveryModal/DeliveryModal"), {
  ssr: false,
});
const AllQuickResponse = dynamic(
  () => import("./QuickResponse/AllQuickResponse"),
  {
    ssr: false,
  }
);

const Activity = () => {
  // update messages
  const [update, setUpdate] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // router
  const router = useRouter();
  const { projectId } = router.query;
  // socket hook
  const { sendMessage, returnMessage } = useSocketChat();

  // get project b y id
  const { data: projectData } = useGetProject({
    projectId: projectId,
    search: "",
    status: "",
  });
  const project = projectData?.data?.project;

  // Dispatch
  const dispatch = useDispatch();

  // toggle activity and page requirements
  const [toggle, setToggle] = useState("activity");

  // get user
  const { user } = useSelector((state) => state.user);

  // images
  const [images, setImages] = useState([]);

  // image upload call
  const { mutate: sendFileData } = useUploadFile({ watermark: true });

  // get all message with redux
  const messagesRedux = useSelector((state) => state.messages);
  // get update with redux
  const messageUpdate = useSelector((state) => state.update);

  // get update with redux
  // get message by projectId
  const {
    data: messageData,
    isLoading,
    isFetching,
  } = useGetMessagesById({
    projectId: projectId,
    userId: project?.startedBy,
    update: messageUpdate?.update,
  });

  // messages form api

  const messages = messageData?.data?.messages;

  // =======================

  // scroll messages
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // input value
  const [value, setValue] = useState("");

  const handleTextareaClick = (e) => {
    setValue((prevText) => prevText + e);
  };

   // show and hide emoji
   const [showEmoji,setShowEmoji]= useState(false)


// set emoji in textarea
 const handleEmojiSelect = (event, emojiObject) => {
  setValue((prevText) => prevText + event?.emoji);
  setShowEmoji(!showEmoji)
  };

  // toast
  const { Toast, showToast } = useToast();
  // console.log(quickResponseData);

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

  // project number 
  function projectNumber(input) {
    const mapping = {
      1: 'A',
      2: 2,
      3: 'C',
      4: 4,
      5: 'E',
      6: 6,
      7: 'G',
      8: 8,
      9: 'i',
      0: 'Z',
    };
  
    const result = [];
  
    for (let i = 0; i < input.length; i++) {
      const digit = input[i];
      if (mapping[digit] !== undefined) {
        result.push(mapping[digit]);
      }
    }
  
    return result.join('');
  }

  console.log(projectNumber('125'),'number')

  
  // blob images for preview images
  let imagesBlobs = [];

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

          const sendMessageData = {
            type: "file",
            projectId: project?.projectId,
            content: data?.messageData,
            reply: reply,
            messageType: "unread",
            files: imageIds,
            userId: project?.startedBy,
            receiverId: project?.startedBy,
            userName: userInfo?.fullName,
          };

          // send
          sendMessage(sendMessageData);
          dispatch(updateState(!messageUpdate?.update));
          reset();
          setReply({});
          handleSendMail(data)
          setImages([]);
          showToast("File Send", "success");
          setValue("");
          handleClick();
        },
        onError: (err) => {
          showToast(err?.response?.data?.message);
          // loading stop
        },
      });
    } else {
      // send normal message
      const sendMessageData = {
        type: "normal",
        projectId: project?.projectId,
        content: data?.messageData,
        reply: reply,
        messageType: "unread",
        receiverId: project?.startedBy,
        userId: project?.startedBy,
      };
      // send
      sendMessage(sendMessageData);
      handleSendMail(data)
      dispatch(updateState(!messageUpdate?.update));
      showToast("Message Send", "success");
      reset();
      handleCreateNotifications(data)
      setReply({});
      setValue("");
      handleClick();
    }
  };
  const isForAdmin = user?.role === 'ADMIN' ? false:true
   // create notification
   const {mutate: createNotification} = useCreateNotifications()
   // handle create notifications
   const handleCreateNotifications  = () =>{
     const notificationData = {
       "type": "project",
       "model":"message",
       "message": value,
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

  useEffect(() => {
    handleClick();
    dispatch(updateState(!messageUpdate?.update));
    dispatch(messagesState([...messagesRedux?.messages, returnMessage]));
  }, [returnMessage]);
  const getOppositeUserMessage = messages?.filter(
    (message) => message?.sender?.senderId !== user?.userId
  );
  const lastMessage = getOppositeUserMessage?.at(-1);







    // handle send mail
    const {mutate:sendMail} = useSendMail({style:true})

    const handleSendMail = (data) =>{
      if(user?.role!=='ADMIN'){
      const emailData = {
        "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      "subject": `You've receive message from ${user?.fullName}`,
      "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've receive message from ${user?.fullName}</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>${data?.messageData}</p></div><br /><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${project?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
      }
      sendMail(emailData,{
        onSuccess: (res) => {
          console.log(res);
          showToast(`Email Send`, "success");
          dispatch(updateState(!messageUpdate?.update))
        },
        onError: (err) => {
          showToast(err?.message);
        },
      })
    }else if(user?.role==='ADMIN'){
      const emailData = {
        "sendToEmail": userInfo?.email,
      "subject": `You've receive message from ${user?.fullName}`,
      "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've receive message from ${user?.fullName}</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>${data?.messageData}</p></div><br /><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${project?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
      }
      sendMail(emailData,{
        onSuccess: (res) => {
          console.log(res);
          showToast(`Email Send`, "success");
          dispatch(updateState(!messageUpdate?.update))
        },
        onError: (err) => {
          showToast(err?.message);
        },
      })
    }
    }
  

  return (
    <>
      <div className="md:flex gap-6 md:px-6">
        <Toast />
        <div className="w-full">
          <div className=" py-6 flex items-center gap-6 border-b border-gray-300 my-2">
            {/* Btns */}
            <button
              onClick={() => setToggle("activity")}
              className={`uppercase font-bold ${
                toggle === "activity"
                  ? "text-blue-500 border-blue-500"
                  : "border-transparent"
              } border-b `}
            >
              Activity
            </button>
            <button
              onClick={() => setToggle("requirements")}
              className={`uppercase font-bold ${
                toggle === "requirements"
                  ? "text-blue-500 border-blue-500"
                  : "border-transparent"
              } border-b `}
            >
              Page Requirements
            </button>
          </div>
          {/* Body */}
          {toggle === "activity" ? (
            <div className="w-full">
              {/* Message body */}
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5).keys()].map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="flex items-center gap-2">
                          <span className="h-12 w-12 bg-base-300 animate-pulse rounded-full"></span>
                          <span className="h-4 w-44 bg-base-300 animate-pulse rounded-lg"></span>
                        </div>
                        <div>
                          <div className="h-24 bg-base-300 animate-pulse rounded-md w-96 ml-12"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-y-auto h-auto max-h-[600px]">
                  {/* Client */}
                  {messages?.length ? (
                    messages?.map((message, i) => {
                      return (
                        <>
                          <div key={i}>
                            <div ref={ref}></div>
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
                              project={project}
                                setReply={setReply}
                                key={message.messageId}
                                message={message}
                              />
                            )}
                            {/* // like Message */}
                            {message?.type === "cancel" && (
                              <CancelMessage
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
                            {message?.type === "delivery" && (
                              <MessageDelivery
                                update={update}
                                setUpdate={setUpdate}
                                setReply={setReply}
                                key={message.messageId}
                                message={message}
                              />
                            )}
                            {/* Extend Delivery */}
                            {message?.type === "extend" && (
                              <ExtendMessage
                                update={update}
                                setUpdate={setUpdate}
                                setReply={setReply}
                                key={message.messageId}
                                message={message}
                              />
                            )}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-96">
                      <p>No Message</p>
                    </div>
                  )}
                  {/* Redux */}
                </div>
              )}

              {/* send box */}
              <div className="border border-gray-500 m-2 relative">
                {/* Scroll Down */}
                <button
                  className="absolute right-5 -top-12"
                  onClick={handleClick}
                >
                  <BsArrowDownCircle size={20} />
                </button>
                <div>
                  {
                    user?.role === 'ADMIN' ? <div>
                    {/* Quick Response */}

                    <AllQuickResponse
                      lastMessage={lastMessage}
                      setValue={handleTextareaClick}
                      value={value}
                    />
                  </div>:''
                  }
                  <div className="my-2 relative">
                    {/* If Reply Message */}
                    <div className="">
                      {reply?.messageId ? (
                        <div className="mx-3 flex">
                          <span className="font-bold">Reply:</span>
                          <p className="flex rounded-full px-2 max-w-fit my-2 mx-2 bg-base-300 items-center gap-2 ">
                            {reply?.reply?.slice(0, 55)}{" "}
                            <span>
                              {reply?.reply?.length > 55 ? "..." : ""}
                            </span>{" "}
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
                      <div className={`flex items-center flex-wrap gap-1 mx-1 ${user?.role==='ADMIN' ? 'my-3':''}`}>
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
                          value={value}
                          id="sendbox"
                          onChange={(e) => setValue(e.target.value)}
                          className="w-full focus-within:border focus-within:outline-none textarea textarea-bordered rounded-none"
                        ></textarea>
                      </div>
                      <div className="flex items-center relative">
                        {/* Like */}
                        <div  className="w-14 relative text-xl cursor-pointer right-0 flex justify-center">
                          {
                            showEmoji ? <span className='w-full h-full fixed left-0 top-0 ' onClick={()=>setShowEmoji(!showEmoji)}></span>:''
                          }
                          <span onClick={()=>setShowEmoji(!showEmoji)}>👍</span>
                          {
                            showEmoji ? <div className='absolute left-0 -top-96'><EmojiPicker onEmojiClick={handleEmojiSelect} /></div>:''
                          }
                        </div>
                        <span
                          // onClick={() => handleSendLike()}
                        
                        >
                       
                        </span>
                        <span className="pr-5 pl-3">|</span>
                        <div className="flex w-full gap-6 items-center">
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
                              document
                                .getElementById("custom_offer")
                                .showModal()
                            }
                          >
                            {" "}
                            Create an offer
                          </span>
                        </div>
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
          ) : (
            <Requirement project={project} />
          )}
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
              <ProjectCountDown
                project={project}
                deadline={project?.deadline}
              />
            </div>
            {user?.role === "ADMIN" ? (
              <>
                <button
                  onClick={() =>
                    document.getElementById("modal_delivery").showModal()
                  }
                  className="bg-blue-500 w-full text-center py-1 font-bold text-lg text-white"
                >
                  Deliver Now
                </button>
                <button
                  onClick={() =>
                    document.getElementById("extend_modal").showModal()
                  }
                  className="text-center py-3 flex justify-center w-full"
                >
                  Extend delivery date
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          {/* Project Details */}
          <div className="bg-blue-50 p-2 px-4">
            <h2 className="text-xl font-bold">Project Details</h2>
            <div className="flex gap-2 bg-white p-2">
              {project?.imageIds?.length ? (
                <img
                  className="w-20 h-16"
                  src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.imageIds?.[0]}`}
                  alt=""
                />
              ) : (
                <img
                  className="w-20 h-16"
                  src="https://dummyimage.com/100x80/"
                  alt=""
                />
              )}

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
                  {dateDiffInDays(project?.updatedAt, project?.deadline) ? (
                    <span className='font-bold'>
                      {dateDiffInDays(project?.updatedAt, project?.deadline)}{" "}
                      Days
                    </span>
                  ) : (
                    <span className='font-bold'>Not Determined</span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <p>Project Started</p>
                  <span className='font-bold'>
                    {moment(project?.updatedAt)
                      .format("ll")
                      .split(" ")
                      .splice(0, 2)
                      .join(" ") +
                      " " +
                      moment(project?.updatedAt).format("LT")}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <p>Project Delivery</p>
                  <span className='font-bold'>
                    {moment(project?.deadline)
                      .format("ll")
                      .split(" ")
                      .splice(0, 2)
                      .join(" ") +
                      " " +
                      moment(project?.updatedAt).format("LT")}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <p>Total Price</p>
                  <span className='font-bold'>${project?.totalCost}</span>
                </li>
                <li className="flex items-center justify-between">
                  <p>Project Number</p>
                  
                  <span className='font-bold'>#MR{projectNumber(`${project?.projectNumber}`)}PN</span>
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
                <span
                  className={`absolute ${
                    project?.track >= 1
                      ? "bg-blue-500"
                      : ` ${
                          project?.track >= 0 ? "bg-blue-500" : "bg-white"
                        } border border-gray-500`
                  } p-2 h-5 w-5 rounded-full -left-2.5`}
                >
                  {project?.track >= 1 && (
                    <BsCheckLg
                      size={16}
                      className="absolute left-0.5 top-0.5"
                      color="white"
                    />
                  )}
                </span>
                <p>Project Placed</p>
              </div>
              <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
                <span
                  className={`absolute ${
                    project?.track >= 2
                      ? "bg-blue-500"
                      : ` ${
                          project?.track >= 1 ? "bg-blue-500" : "bg-white"
                        } border border-gray-500`
                  } p-2 h-5 w-5 rounded-full -left-2.5`}
                >
                  {project?.track >= 2 && (
                    <BsCheckLg
                      size={16}
                      className="absolute left-0.5 top-0.5"
                      color="white"
                    />
                  )}
                </span>
                <p>Requirement Submitted</p>
              </div>
              <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
                <span
                  className={`absolute ${
                    project?.track >= 3
                      ? "bg-blue-500"
                      : ` ${
                          project?.track >= 2 ? "bg-blue-500" : "bg-white"
                        } border border-gray-500`
                  } p-2 h-5 w-5 rounded-full -left-2.5`}
                >
                  {project?.track >= 3 && (
                    <BsCheckLg
                      size={16}
                      className="absolute left-0.5 top-0.5"
                      color="white"
                    />
                  )}
                </span>
                <p>Project Running</p>
              </div>
              <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
                <span
                  className={`absolute ${
                    project?.track >= 4
                      ? "bg-blue-500"
                      : ` ${
                          project?.track >= 3 ? "bg-blue-500" : "bg-white"
                        } border border-gray-500`
                  } p-2 h-5 w-5 rounded-full -left-2.5`}
                >
                  {project?.track >= 4 && (
                    <BsCheckLg
                      size={16}
                      className="absolute left-0.5 top-0.5"
                      color="white"
                    />
                  )}
                </span>
                <p>Review Delivery</p>
              </div>
              <div className="relative ml-6 border-l border-blue-500 pl-4">
                <span
                  className={`absolute ${
                    project?.track >= 5
                      ? "bg-blue-500"
                      : ` ${
                          project?.track >= 4 ? "bg-blue-500" : "bg-white"
                        } border border-gray-500`
                  } p-2 h-5 w-5 rounded-full -left-2.5`}
                >
                  {project?.track >= 5 && (
                    <BsCheckLg
                      size={16}
                      className="absolute left-0.5 top-0.5"
                      color="white"
                    />
                  )}
                </span>
                <p>Complete Project</p>
              </div>
            </div>
          </div>
          {/* Project Cancel */}
          <div className="flex items-center bg-blue-50">
            <button
              className=" text-center py-4 px-4"
              onClick={() =>
                document.getElementById("cancel_modal").showModal()
              }
            >
              Cancel This Project
            </button>
          </div>
        </div>

        {/* Edit modal */}
        <ExtendDeliveryModal
          update={update}
          setUpdate={setUpdate}
          project={project}
          reply={reply}
          setReply={setReply}
        />
        <CancelModal setReply={setReply}
          reply={reply}
          project={project}
          userInfo={userInfo} />
        <CustomOfferModal
          update={update}
          setUpdate={setUpdate}
          setReply={setReply}
          reply={reply}
          project={project}
        />
        <DeliveryModal
          update={update}
          setUpdate={setUpdate}
          setReply={setReply}
          reply={reply}
          project={project}
        />
      </div>
    </>
  );
};

export default Activity;

function dateDiffInDays(date1, date2) {
  // Convert both dates to milliseconds
  let date1_ms = new Date(date1).getTime();
  let date2_ms = new Date(date2).getTime();

  // Calculate the difference in milliseconds
  let difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return Math.round(difference_ms / (1000 * 60 * 60 * 24));
}
