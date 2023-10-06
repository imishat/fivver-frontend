import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowDownCircle, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCreateMessage } from "../queries/mutation/message.mutation";
import { useGetMessagesById } from "../queries/query/getMessagesById.query";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import useToast from "../utility/useToast";
import CustomOfferModal from "./CustomOfferModal";

import Link from "next/link";
import { io } from "socket.io-client";
import MessageCard from "./MessageCard";
import MessageLike from "./MessageLike/MessageLike";
import MessageUserCard from "./MessageUserCard";
import OfferMessageCard from "./OfferMessageCard";
import AllQuickResponse from "./QuickResponse/AllQuickResponse";

const Message = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // router
  const router = useRouter();

  // get message id from query
  const { messageId } = router.query;

  // get message by projectId
  const { data: messageData } = useGetMessagesById({
    projectId: "",
    userId: messageId,
  });

// socket
  // socket
  let authorization =
    `Bearer ${typeof window!=='undefined' && window.localStorage.getItem('accessToken')}`;

  let url = "ws://103.49.169.89:30912";
  const client = io(url, {
    path: "/realtime-messaging",
  });

  useEffect(() => {
    client.emit("authorization", authorization);
    client.on("error", (erroneousResponse) => {
      erroneousResponse = JSON.parse(erroneousResponse);
      console.error(erroneousResponse);
    });
    client.on("disconnect", () => {
      client.off("authorized", authorization);
      client.off("message", onMessageReceivedAsync);
      console.log("disconnected from the server.");
    });
  }, [client]);


    // scroll messages
    const ref = useRef(null);
    const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    };

  // get user
  const { user } = useSelector((state) => state.user);
  // const userInfo = userData?.data?.user
  // create message
  const { mutate: createMessage } = useCreateMessage();
  // message data
  const messages = messageData?.data?.messages;

  // input value
  const [value, setValue] = useState("");

  // send value
  const [sendValue, setSendValue] = useState("");

  // toast
  const { Toast, showToast } = useToast();

  // get user by id
  const { data: userData } = useGetUserData({ token: "", userId: messageId });
  // user info
  const userInfo = userData?.data?.user;

  // ================= message send area ==============
  // Reply
  const [reply, setReply] = useState({});

  // handle send message
  // const handleSendMessage = (data) => {
  //   const sendMessage = {
  //     type: "normal",
  //     content: data?.messageData,
  //     reply: reply,
  //     userId: userInfo?.userId,
  //     userName: userInfo?.fullName,
  //   };

  //   client.send(JSON.stringify(sendMessage));
  //   setUpdate(!update)
  //   showToast('Message Send','success')
  //   reset();
  //   setReply({})
  //   setValue('')
  // };


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
    console.log(data);
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


  // handle send like
  const handleSendLike = () => {
    const sendLike = {
      type: "like",
      content: "👍",
      reply: reply,
      userId: userInfo?.userId,
      userName: userInfo?.fullName,
    };

     // send
     client.send(JSON.stringify(sendLike));
     setUpdate(!update)
     setReply({})
     showToast('Liked','success')
  };

  // get all messages
  const { data: messagesData } = useGetMessagesById({
    userId: "",
    projectId: "",
  });
  const messagesNames = messagesData?.data?.messages;

  // get all user ids
  const userIds = [];
  useEffect(() => {
    messagesNames?.map((message) => {
      userIds.push(message.userId);
    });
  }, [messagesNames]);



  client.on("message", onMessageReceivedAsync);
  async function onMessageReceivedAsync(message) {
    
    // setSocketData(prevMessages=>[...prevMessages, JSON.parse(message)]);
    // message.push(JSON.parse(message))
    setUpdate(!update)
  }


  return (
    <div className="md:w-[90%] mx-auto my-12 gap-2 md:flex">
      <Toast />
      <div className="md:w-8/12 ">
        <div className="h-14 w-full bg-[#CCE5FB] px-4 flex items-center">
          {/* filter */}
          <div className="flex items-center justify-between w-full">
            <span>
              <BsSearch />
            </span>
            <select className="bg-white border border-gray-400 px-2 py-1">
              <option value="all">All Conversations</option>
              <option value="unread">Unread</option>
              <option value="starred">Starred</option>
              <option value="block">Block List</option>
              <option value="custom">Custom Offers</option>
            </select>
          </div>
        </div>
        {/* Result */}
        <div className="overflow-y-auto h-auto max-h-[600px]">
          <ul>
            {messagesNames?.length
              ? messagesNames?.map((message) => (
                  <MessageUserCard key={message?.messageId} message={message} />
                ))
              : "No Message"}
          </ul>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full">
        <div className=" py-6 flex items-center gap-6 border-b border-gray-300 my-2">
          {/* Btns */}
          <button className="uppercase font-bold text-blue-500 border-b border-blue-500">
            Activity
          </button>
        </div>
        {/* Body */}
        <div className="w-full">
          <div className="h-14 w-full bg-[#EFEFEF] pl-4 flex items-center">
            {/* Top bar */}
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-between w-full items-center leading-4">
                <div>
                  <strong>{userInfo?.fullName}</strong>
                  <p className="text-xs">
                    Last seen 18 hourse ago | Local Time: May 29, 2023, 1:20 PM
                  </p>
                </div>
                <div>
                  <details className="dropdown dropdown-left md:dropdown-open md:dropdown-bottom">
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
                  </details>
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
                  {/* // Like Message */}
                  {message?.type === "like" && (
                    <MessageLike
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                </div>
              );
            })}

          
          </div>
          {/* send box */}
          <div className="border border-gray-500 m-2">
          <button className="absolute right-5 -top-12" onClick={handleClick}><BsArrowDownCircle size={20} /></button>
            <div className="w-full">
              {/* Quick Response */}
              {user?.role === "ADMIN" ? (
                <AllQuickResponse value={value} setValue={setValue} />
              ) : (
                ""
              )}
              {user?.action === "block" ? (
                <div className="w-full flex justify-center text-center">
                  <div className="flex items-center gap-2">
                    <h2>You have been blocked by admin</h2>
                    <Link className="text-blue-400 font-bold" href={`/contact`}>Contact Us</Link>
                  </div>
                </div>
              ) : (
                <div className="my-2 relative">
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
                      {/* Offer */}
                      <span className="flex w-full gap-6 items-center">
                        <span className="cursor-pointer">
                          <MdAttachment size={24} />
                        </span>
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
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Edit modal */}

      <CustomOfferModal project={{ startedBy: messageId }} reply={reply} />
    </div>
  );
};

export default Message;
