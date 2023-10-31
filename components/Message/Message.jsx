import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowDownCircle, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useGetMessagesById } from "../queries/query/getMessagesById.query";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import useToast from "../utility/useToast";
import CustomOfferModal from "./CustomOfferModal";

import { useSocketChat } from "@/hooks/useSocketChat";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useUploadFile } from "../queries/mutation/fileUpload.mutation";
import { useUpdateUser } from "../queries/mutation/updateUser.mutation";
import { useGetUniqueMessages } from "../queries/query/getAllUniqueMessages.query";
import { updateState } from "../redux/features/update/updateSlice";
import MessageCard from "./MessageCard";
import MessageFiles from "./MessageFiles/MessageFiles";
import MessageStart from "./MessageLike/MessageStart";
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
  // update

  // router
  const router = useRouter();
// Socket
  const {  sendMessage, returnMessage } = useSocketChat();

  // dispatch 
  const dispatch = useDispatch()
  // update state
  // get update with redux
  const messageUpdate = useSelector((state) => state.update);


  // update 
  const { mutate: sendFileData } = useUploadFile({ watermark:true });
  // get message id from query
  const { messageId } = router.query;

  // get message by projectId
  const { data: messageData } = useGetMessagesById({
    projectId: "",
    userId: messageId,
    update:messageUpdate?.update
  });

  // update user
  const {mutate:updateUser} = useUpdateUser()

  // message type 
  const [messageType,setMessageType] = useState('')

  // get user by id
  const { data: userData } = useGetUserData({ token: "", userId: messageId,update:messageUpdate?.update });
  // user info
  const userInfo = userData?.data?.user;
   
  // get all unique messages
  const {data:uniqueMessagesData} = useGetUniqueMessages({update:messageUpdate?.update}) 
  let uniqueMessages = uniqueMessagesData?.data?.messages




  console.log(userInfo,'messages')

    // scroll messages
    const ref = useRef(null);
    const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    };

  // get user
  const { user } = useSelector((state) => state.user);
  // const userInfo = userData?.data?.user


   // show and hide emoji
   const [showEmoji,setShowEmoji]= useState(false)


// set emoji in textarea
 const handleEmojiSelect = (event, emojiObject) => {
  setValue((prevText) => prevText + event?.emoji);
  setShowEmoji(!showEmoji)
  };


  // message data
  const messages = messageData?.data?.messages;


  // input value
  const [value, setValue] = useState("");

  const handleTextareaClick = (e) => {
    setValue(prevText => prevText + e);
  };

  const [loading,setLoading] = useState(false)


// handle star
const handleStar = () =>{
  setLoading(true)
  const action={
    star:!userInfo?.star,
    action:'aaaa',
  }
  updateUser(action,{
    onSuccess: (res) => {
      console.log(res);
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
  // toast
  const { Toast, showToast } = useToast();

  // ================= message send area ==============
  // Reply
  const [reply, setReply] = useState({});

 
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

          const sendMessageData = {
            type: "file",
            projectId: '',
            content: data?.messageData,
            reply: reply,
            files: imageIds,
            messageType:'unread',
            userId: messageId,
            receiverId: messageId,
            userName: userInfo?.fullName,
          };

          // send
          sendMessage(sendMessageData);
          dispatch(updateState(!messageUpdate?.update))
          reset()
          handleClick()
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
      const sendMessageData = {
        type: "normal",
        projectId: '',
        content: data?.messageData,
        reply: reply,
        messageType:'unread',
        receiverId: messageId,
        userId: messageId,
      };
      // send
      sendMessage(sendMessageData);
      dispatch(updateState(!messageUpdate?.update))
      showToast('Message Send','success')
      reset();
      handleClick()
      setReply({})
      setValue('')
    }
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
    handleClick()
  }, [messagesNames]);


  useEffect(()=>{
    dispatch(updateState(!messageUpdate?.update))
    handleClick()
    console.log(messageUpdate?.update)
  },[returnMessage])

// get last message
const lastMessage = messages?.at(-1)

const localDate = new Date()

// block unblock
const handleBlockUser = () =>{
  const blockData = {
    id:userInfo?.userId,
    action:'block'
  }
}
const handleUnBlockUser = () =>{
  const blockData = {
    id:userInfo?.userId,
    action:'unblock'
  }
}
console.log(uniqueMessages)
// search 
const [showSearch,setShowSearch] = useState(false)
// search input
const [search,setSearch] = useState('')

// after filter
const [uniqueNewData,setUniqueData] = useState(uniqueMessages)

// handleSearch
const handleSearch = () =>{
  const regex = new RegExp(search)
  const afterFilter = uniqueMessages?.filter(message=>regex.test(message?.receiver?.fullName.toLowerCase()))
  setUniqueData(afterFilter)
}

  return (
    <div className="md:w-[90%] mx-auto my-12 gap-2 md:flex">
      <Toast />
      <div className="md:w-8/12 ">
        <div className="h-14 w-full bg-[#CCE5FB] px-4 flex items-center">
          {/* filter */}
          <div className="flex items-center justify-between w-full">
          {
          user?.role ==='ADMIN' ?
          <div>
            {
              !showSearch? <button onClick={()=>setShowSearch(!showSearch)} className="flex items-center "> <BsSearch /></button>:<button onClick={()=>{
                setShowSearch(!showSearch)
                setUniqueData(uniqueMessages)
              }} className="flex items-center "> <CgClose size={22} /></button>
            }
            
             
            </div>:''
        }
            
         {
          user?.role ==='ADMIN' && !showSearch ?
          <select onChange={e=>setMessageType(e.target.value)} className="bg-white border border-gray-400 px-2 py-1">
          <option value="">All Conversations</option>
          <option value="unread">Unread</option>
          <option value="starred">Starred</option>
          <option value="block">Block List</option>
          <option value="custom">Custom Offers</option>
        </select>
          :
          <div className="flex items-center">
            <input type="search" onChange={(e)=>setSearch(e.target.value)} className="px-4 py-2" placeholder="search" name="search" id="" /><button onClick={()=>handleSearch()} className="px-4 py-3 bg-blue-400 flex text-white items-center"><BiSearchAlt2 /></button>
          </div>
         }
          </div>
        </div>
        {/* Result */}
        <div className="overflow-y-auto h-auto max-h-[600px]">
          <ul>
            {uniqueNewData?.length
              ? uniqueNewData?.map((message) => (
                  <MessageUserCard  messageId={messageId} key={message?.messageId} lastMessage={lastMessage} message={message} />
                ))
              : "No Message"}
          </ul>
        </div>
      </div>
      {/* Right side */}
      {
        router?.asPath === "/message" ?
        <div className="w-full flex items-center h-96 justify-center">
          <h3>Select User For Start Message</h3>
        </div>
        :
        <div className="w-full">
       
        {/* Body */}
        <div className="w-full">
          <div className="h-14 w-full bg-[#EFEFEF] pl-4 flex items-center">
            {/* Top bar */}
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-between w-full items-center leading-4">
                <div>
                  <strong>{userInfo?.fullName}</strong>
                  <p className="text-xs">

                    
                    Last seen {moment(lastMessage?.createdAt).fromNow()} | Local Time:{moment(localDate).format('lll')}
                  </p>
                </div>
                {
                  user?.role ==='ADMIN' ? 
                  <div>
                  <details className="dropdown dropdown-left md:dropdown-open md:dropdown-bottom">
                    <summary className="m-1 btn">
                      <BsThreeDotsVertical />
                    </summary>
                    <ul className="p-2 shadow dropdown-content z-[1] bg-base-100 rounded w-28">
                      <li className="w-20">
                          <button onClick={()=>handleStar()} className={`${loading?'px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24 animate-pulse':'px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24'}`}>
                          {
                            userInfo?.star ? 'Stared':'Star'
                          }
                        </button>
                        
                        
                      </li>
                    
                     {
                      userInfo?.action==='block' ?   <li className="w-20">
                      <button onClick={()=>handleUnBlockUser()} className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                        Unblock
                      </button>
                    </li>:<li className="w-20">
                      <button onClick={()=>handleBlockUser()} className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                        Block
                      </button>
                    </li>
                     }
                    
                    </ul>
                  </details>
                  {/* <button><BsThreeDotsVertical /></button> */}
                </div>
                  :''
                }
               
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
                  {/* Files Message */}
                  {message?.type === "file" && (
                    <MessageFiles
                      setReply={setReply}
                      key={message.messageId}
                      message={message}
                    />
                  )}
                  {/* // Like Message */}
                  {message?.type === "start" && (
                    <MessageStart
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
          <div className="border border-gray-500 m-2 relative">
             {/* Scroll Down */}
          <button className="absolute right-5 -top-12" onClick={handleClick}><BsArrowDownCircle size={20} /></button>
            <div className="w-full">
              {/* Quick Response */}
              {user?.role === "ADMIN" ? (
                <AllQuickResponse value={value} setValue={handleTextareaClick} />
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
                        value={value}
                        id="sendbox"
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full textarea textarea-bordered rounded-none"
                      ></textarea>
                    </div>
                    <div className="flex items-center ">
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
                       {
                        user?.role==='ADMIN' ?
                        <span
                        className="cursor-pointer"
                        onClick={() =>
                          document.getElementById("custom_offer").showModal()
                        }
                      >
                        {" "}
                        Create an offer
                      </span>
                      :''
                       }
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
      }
     
      {/* Edit modal */}

      <CustomOfferModal project={{ startedBy: messageId }} reply={reply} />
    </div>
  );
};

export default Message;
