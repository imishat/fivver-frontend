import { useUpdateMessage } from "@/components/queries/mutation/updateMessage.mutation";
import { useGetFile } from "@/components/queries/query/getFiles.queries";
import { useGetSingleMessage } from "@/components/queries/query/getSignleMessage.query";
import useToast from "@/components/utility/useToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeftCircle, BsReply } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function ImageModal({ messageId }) {

  // get user
  const { user } = useSelector((state) => state.user);
  // update
  const [update, setUpdate] = useState(false);
  // hook form
  const { register, handleSubmit, reset } = useForm();
  // update message
  const { mutate: updateMessage } = useUpdateMessage();

  // get message info
  const { data: signMessageInfo } = useGetSingleMessage({
    messageId: messageId,
    update: update,
  });
  const singleMessage = signMessageInfo?.data?.message;
  console.log(singleMessage);
  // image id from local
  const imageId =
    typeof window !== "undefined" && localStorage.getItem("imageId");

  // highlight comment
  const [highLightComment, setHighLightComment] = useState({});

  // get file info
  const { data: imageInfo } = useGetFile({ fileId: imageId });
  const image = imageInfo?.data?.file;

  // store data
  const [commentStore, setCommentStore] = useState([]);



  // get image cursor position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    // Get the image's position and dimensions
    const rect = e.target.getBoundingClientRect();

    // Calculate the click position relative to the image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  // toast
  const { Toast, showToast } = useToast();

  // reply
  const [reply, setReply] = useState({});

  // handle comment
  const handleComment = (data) => {
    const commentData = {
      position,
      sender: { name: user?.fullName, profilePicture: user?.profilePicture, id: user?.userId },
      id: uuidv4().split("-")[0],
      comment: data.message,
      reply: reply,
    };
    setCommentStore([...commentStore, commentData]);

    reset();
    setReply({});
  };

  const handleSendComment = () => {
    const messageInfo = {
      comments: singleMessage?.comments?.concat(commentStore),
      id: messageId,
      projectId: singleMessage?.projectId,
      receiverId: singleMessage?.receiverId,
    };
    
    updateMessage(messageInfo, {
      onSuccess: (res) => {
        console.log(res);
        showToast("Comment Submitted", "success");
        setCommentStore([]);
        setUpdate(!update);
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  };

  // handle delete message
  const handleDeleteMessage = id =>{
    console.log(id)
    const restComments = singleMessage?.comments.filter(comment=>comment.id!==id)
    const messageInfo = {
      comments: restComments,
      id: messageId,
      projectId: singleMessage?.projectId,
      receiverId: singleMessage?.receiverId,
    };
    updateMessage(messageInfo, {
      onSuccess: (res) => {
        console.log(res);
        showToast("Comment Deleted", "success");
        setUpdate(!update);
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  }

  return (
    <div>
      <Toast />
      <dialog id="image_modal" className="modal">
        <div className="modal-box bg-transparent h-full backdrop-blur-md w-full max-w-7xl min-w-fit">
          <div className="flex w-full h-full">
            <div className="w-full">
              <div className="flex items-center gap-2">
                {/* Close */}
                <form method="dialog">
                  <button className="">
                    <BsArrowLeftCircle
                      className="bg-black text-white rounded-full"
                      size={25}
                    />
                  </button>
                </form>
                {/* Title */}
                <h3 className="font-bold text-lg">
                  {image?.originalFileName && image?.originalFileName}
                </h3>
              </div>

              {/* Image  */}
              <div className=" w-full relative p-12 flex items-center">
                <img
                  draggable={false}
                  className="w-full max-h-fit min-h-full"
                  src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${image?.fileId}`}
                  onClick={(e) => handleImageClick(e)}
                  alt=""
                />
                {commentStore?.map((comment, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        left: comment?.position.x + 40 + "px",
                        top: comment?.position.y + 40 + "px",
                      }}
                      className="bg-indigo-500 absolute h-4 w-4 border-2 border-white rounded-full"
                    ></div>
                  );
                })}
                {singleMessage?.comments?.map((comment, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        left: comment?.position.x + 40 + "px",
                        top: comment?.position.y + 40 + "px",
                      }}
                      className="bg-indigo-500 absolute h-4 w-4 border-2 border-white rounded-full"
                    ></div>
                  );
                })}
                <div
                  style={{
                    left: position.x + 40 + "px",
                    top: position.y + 40 + "px",
                  }}
                  className="bg-indigo-500 absolute h-4 w-4 border-2 border-white rounded-full"
                ></div>
                {highLightComment?.comment ? (
                  <div
                    style={{
                      left: highLightComment?.position?.x + 40 + "px",
                      top: highLightComment?.position?.y + 40 + "px",
                    }}
                    className="bg-rose-500 absolute h-4 w-4 border-2 border-white rounded-full"
                  >
                    <span className="bg-base-100 px-2 py-1 w-24 truncate rounded relative top-6">
                      {highLightComment?.comment}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* Image Comment */}
            <div className="w-[400px] h-fit min-h-fit pb-20 bg-white relative ">
              <div className="px-4 py-2 border-b">
                <p className="font-bold">Comments</p>
              </div>
              <div className="bg-green-50 border-b px-3 my-2">
                <h2 className="text-sm font-bold truncate">
                  {image?.originalFileName}
                </h2>
                <p className="text-sm">2 Comments</p>
              </div>
              {/* COmments */}
              <div className="overflow-y-auto h-96">
                {/* Submitted Data Get From API */}
                <div className=" ">
                  {singleMessage?.comments?.map((comment, i) => {
                    return (
                      <div
                        key={i}
                        className="px-4 mb-2 border-b border-gray-300"
                      >
                        <div className="flex items-center gap-2 relative">
                          <img
                            className="w-6 object-cover h-6 rounded-full"
                            src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${image?.fileId}`}
                            alt=""
                          />
                          <p className="font-bold text-lg">{comment?.sender?.id ===user?.userId ? 'Me':comment?.sender?.name}</p>
                          <span onClick={()=>handleDeleteMessage(comment?.id)}
                            className="bg-rose-400 cursor-pointer rounded-full p-1 absolute h-3 w-3 top-0 right-0"
                          ></span>
                        </div>
                        <div className="my-2 ml-9  text-sm">
                          {comment?.reply?.id ? (
                            <span className="bg-base-300 opacity-40 rounded-full px-2 py-0">
                              {comment?.reply
                                ? comment?.reply?.reply?.slice(0, 15)
                                : ""}
                            </span>
                          ) : (
                            ""
                          )}
                          <p
                            className="cursor-pointer"
                            onClick={() => setHighLightComment(comment)}
                          >
                            {comment?.comment}
                          </p>
                          <div
                            onClick={() =>
                              setReply({
                                id: comment?.id,
                                reply: comment?.comment,
                              })
                            }
                            className="flex my-2 items-center gap-2"
                          >
                            <BsReply size={20} />
                            <p className="text-sm">Reply</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Added Data Not Submitted */}
                <div className=" ">
                  {commentStore?.map((comment, i) => {
                    return (
                      <div
                        key={i}
                        className="px-4 mb-2 border-b border-gray-300"
                      >
                        <div className="flex items-center gap-2 relative">
                          <span
                            onClick={() =>
                              setCommentStore(
                                commentStore.filter(
                                  (com) => com.position !== comment.position
                                )
                              )
                            }
                            className="bg-rose-400 cursor-pointer rounded-full p-1 absolute h-3 w-3 top-0 right-0"
                          ></span>
                          <img
                            className="w-6 object-cover h-6 rounded-full"
                            src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${image?.fileId}`}
                            alt=""
                          />
                          <p className="font-bold text-lg">{comment?.sender?.id ===user?.userId ? 'Me':comment?.sender?.name}</p>
                          <p className="rounded-full border px-2 py-0 text-sm font-semibold border-gray-300">
                            Not Yet Submitted
                          </p>
                        </div>
                        <div className="my-2 ml-9  text-sm">
                        {comment?.reply?.id ? (
                            <span className="bg-base-300 opacity-40 rounded-full px-2 py-0">
                              {comment?.reply
                                ? comment?.reply?.reply?.slice(0, 15)
                                : ""}
                            </span>
                          ) : (
                            ""
                          )}  
                          <p
                            className="cursor-pointer"
                            onClick={() => setHighLightComment(comment)}
                          >
                            {comment?.comment}
                          </p>
                          <div
                            onClick={() =>
                              setReply({
                                id: comment?.id,
                                reply: comment?.comment,
                              })
                            }
                            className="flex my-2 items-center gap-2"
                          >
                            <BsReply size={20} />
                            <p className="text-sm">Reply</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Comment Box */}
              <div className="border border-emerald-800 m-4">
                <div className="p-2">
                  <div className="flex items-center overflow-hidden gap-1">
                    <img
                      className="w-6 object-cover h-6 rounded-full"
                      src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${image?.fileId}`}
                      alt=""
                    />
                    <p className="font-bold truncate text-sm w-56">
                      {reply?.reply}
                    </p>
                    {reply?.id ? (
                      <button onClick={() => setReply({})}>
                        <IoClose />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>

                  <form onSubmit={handleSubmit(handleComment)}>
                    <textarea
                      {...register("message", { required: true })}
                      className="textarea w-full rounded border-b border-t-0 border-l-0 border-r-0 focus-within:outline-none textarea-bordered"
                    ></textarea>
                    <div className="flex items-center justify-end">
                      <span className="px-2 cursor-pointer font-bold text-gray-500">
                        Cancel
                      </span>

                      <button className="px-2 font-bold cursor-pointer text-emerald-600">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                {/* Submit */}
              </div>
              <div className="absolute mb-4  -bottom-1 w-full flex items-center">
                <button
                  onClick={() => handleSendComment()}
                  className="py-2 text-center w-full rounded-md mx-4 text-white bg-emerald-500 font-bold text-lg"
                >
                  Submit {commentStore?.length} Comments
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ImageModal;
