import { useDeleteAction } from "@/components/queries/mutation/delete.mutation";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import useToast from "@/components/utility/useToast";
import { useEffect, useState } from "react";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { io } from "socket.io-client";
import AllQuickResponse from "../QuickResponse/AllQuickResponse";

function DeliveryModal({ update,setUpdate,reply,setReply,project }) {
  const { mutate: deleteFile } = useDeleteAction();

  // image upload call
  const { mutate: sendFileData } = useUploadFile({ watermark: false });

  // toast
  const { showToast, Toast } = useToast();

  // quick response value
  const [value, setValue] = useState("");

  const [updateValue, setUpdateValue] = useState(false)
  // ============== socket options =================

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


  // kb convert
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
// draft state
const [draftData,setDraftData] = useState({})

  // ============= Thumbnail area start ===============

  const [thumbnail, setThumbnail] = useState({});



  // handle upload thumbnail
  const handleUploadThumbnail = (e) => {
    e.preventDefault();
    const thumbnail = e.target.files;
    const photoData = new FormData();
    photoData.append("files", thumbnail[0]);
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;
        showToast("Photo Uploaded", "success");
        setThumbnail(images[0]);
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
      },
    });
  };
  // ============= Thumbnail area end ===============

  // ============= Source Files area start ===============

  const [sourceFiles,setSourceFiles] = useState([])

 // handle upload Source Files
 const handleUploadSourceFiles = (e) => {
    e.preventDefault();
    const thumbnail = e.target.files;
    const photoData = new FormData();
    for(const p in thumbnail) {
        photoData.append("files", thumbnail[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;
        showToast("Image Uploaded", "success");
        setSourceFiles(images)
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
      },
    });
  };


  console.log(draftData)
  // ============= Source Files area end ===============

  // ============== Input Area start =============

  
  // handle send messages
  const handleSendMessage = () => {
    const messageData = {
        type: "delivery",
        content: value || draftData?.content,
        thumbnail: thumbnail?.fileId ? thumbnail:draftData?.thumbnail,
        sourceFiles:sourceFiles?.[0]?.fileId ? sourceFiles:draftData?.sourceFiles,
        projectId: project?.projectId,
        reply: reply|| draftData?.reply,
        receiverId: project?.startedBy,
        userId: project?.startedBy,
    }

    client.send(JSON.stringify(messageData));
    setUpdate(!update)
    showToast('Message Send','success')
    setReply({})
    setValue('')
  }
  // ============== Input Area end =============
  client.on("message", onMessageReceivedAsync);
  async function onMessageReceivedAsync(message) {
    
    // message.push(JSON.parse(message))
    setUpdate(!update)
  }

  // ========= draft ===========

    // get draft data from local storage
   
    useEffect(()=>{
      if(typeof window!== 'undefined' && window.localStorage.getItem('draft')){
        setDraftData(JSON.parse(window.localStorage.getItem('draft')))
      }
    },[updateValue])

    // save in local
  const handleDraft = () =>{
    const messageData = {
        content: draftData?.content||value,
        thumbnail: draftData?.thumbnail?.fileId ? draftData?.thumbnail:thumbnail,
        sourceFiles:draftData?.sourceFiles[0]?.fileId?draftData?.sourceFiles : sourceFiles,
        projectId: project?.projectId,
        reply: draftData?.reply || reply,
        receiverId: project?.startedBy,
        userId: project?.startedBy,

    }
    typeof window !== 'undefined' && window.localStorage.setItem('draft', JSON.stringify(messageData))
    showToast('Data saved in Draft','success')
  }

  // delete source file
  const handleDeleteSourceFiles = e =>{
    deleteFile(
        { type: "files", id: e },
        {
          onSuccess: (res) => {
            console.log(res);
            showToast("Image Deleted", "success");
            setSourceFiles(sourceFiles.filter(id => id.fileId!== e));
            
            const messageData = {
              content: draftData?.content,
              thumbnail: draftData?.thumbnail,
              sourceFiles: draftData?.sourceFiles?.filter(draft=>draft.fileId!==e),
              projectId: project?.projectId,
              reply: draftData?.reply,
              receiverId: project?.startedBy,
              userId: project?.startedBy,
      
          }
          typeof window !== 'undefined' && window.localStorage.setItem('draft', JSON.stringify(messageData))
            setUpdateValue(!update)

          },
          onError: (err) => {
            showToast(err?.message);
            setUpdateValue(!update)
          },
        }
      );
  }

    // delete thumbnail
    const handleDeleteThumbnail = () => {
      deleteFile(
        { type: "files", id: draftData?.thumbnail?.fileId||thumbnail?.fileId },
        {
          onSuccess: (res) => {
            console.log(res);
            showToast("Thumbnail Deleted", "success");
            setThumbnail({});
            const messageData = {
              content: draftData?.content,
              thumbnail: {},
              sourceFiles: draftData?.sourceFiles,
              projectId: project?.projectId,
              reply: draftData?.reply,
              receiverId: project?.startedBy,
              userId: project?.startedBy,
          }
          typeof window !== 'undefined' && window.localStorage.setItem('draft', JSON.stringify(messageData))
          setUpdateValue(!update)
          },
          onError: (err) => {
            showToast(err?.message);
            setUpdateValue(!update)
          },
        }
      );
    };


  // source files
  const allFiles = sourceFiles?.length? sourceFiles: draftData?.sourceFiles
  return (
    <dialog id="modal_delivery" className="modal w-full backdrop-blur-md">
      <Toast />
      <div className="modal-box w-7/12 max-w-5xl rounded p-4 border border-gray-400">
        <div className="">
          {/* title */}
          <div className="flex justify-between items-center">
            <h2 className="py-4 text-xl font-bold text-blue-400">
              Deliver Work
            </h2>
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="p-4">
                <IoClose size={28} />
              </button>
            </form>
          </div>
          <div className="border">
            {/* Quick Response */}
            <AllQuickResponse setValue={setValue} value={value} />
          </div>
          {/* Message Body */}
          <div>
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
            <textarea
              className="w-full p-2 textarea textarea-lg textarea-bordered rounded-none"
              defaultValue={draftData?.content?draftData?.content:value}
              onChange={(e)=>setValue(e.target.value)}
            ></textarea>
          </div>
          {/* Images */}
          <div className="w-full overflow-x-auto flex items-center gap-3 my-3 image_scroll">
            {(sourceFiles?.[0]?.fileId || draftData?.sourceFiles?.[0]?.fileId) ?
            
            allFiles?.map((image, i) => {
              return (
                <>
                {
                  image?.fileId?<div key={i} className="w-28 relative">
                  <span onClick={()=>handleDeleteSourceFiles(image?.fileId)} className="absolute top-0 right-0 text-rose-600 bg-rose-100 cursor-pointer">
                    <IoClose size={20} />
                  </span>
                  {
                     
                      image?.fileExtension ==='.png' && <img
                      className="w-28 bg-rose-100 h-24 border overflow-hidden object-cover"
                      src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${image?.fileId}`}
                      alt=""
                      />
                     
                  }
                  {
                     
                      image?.fileExtension ==='.psd' && <img
                      className="w-28 bg-rose-100 h-24 border p-4 overflow-hidden object-cover"
                      src={`/images/psd.png`}
                      alt=""
                      />
                     
                  }
                  {
                     
                      image?.fileExtension ==='.pdf' && <img
                      className="w-28 bg-rose-100 h-24 p-4 border overflow-hidden object-cover"
                      src={`/images/pdf.png`}
                      alt=""
                      />
                     
                  }
                  
                  <div className=" flex text-sm">
                    <p className="w-24 truncate">{image?.originalFileName}</p>
                  </div>
                  <p className="text-xs">{formatBytes(image?.fileSize)}</p>
                </div>:''
                }
                
                    </>
              );
          
            })
            :''
          }
          </div>
          {/* Thumbnail Btn */}
          <div className="flex my-7 justify-between items-center">
            <div className="flex items-center gap-3">
              <label
                htmlFor="thumbnail"
                className="px-4 py-2 flex gap-2 rounded-md text-black cursor-pointer bg-blue-100 font-bold"
              >
                {" "}
                <MdOutlineAttachFile size={22} />{" "}
                <input
                  onChange={(e) => handleUploadThumbnail(e)}
                  hidden
                  type="file"
                  id="thumbnail"
                />{" "}
                Thumbnail
              </label>

              <label
                htmlFor="source"
                className="px-4 py-2 flex gap-2 rounded-md text-black cursor-pointer bg-blue-100 font-bold"
              >
                {" "}
                <MdOutlineAttachFile size={22} /> 
                <input
                  onChange={(e) => handleUploadSourceFiles(e)}
                  hidden
                  multiple
                  type="file"
                  id="source"
                />{" "}
                Source Files
              </label>

            </div>
            <p>{draftData?.sourceFiles?.length || sourceFiles?.length} Attachments</p>
          </div>
          {/* Attachment Preview */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2 w-1/2">
              <div className="relative">
                {draftData?.thumbnail?.fileId || thumbnail?.fileId ? (
                  <img
                    className="w-20 border-2 bg-blue-200 object-cover overflow-hidden inline-block rounded h-16"
                    src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${draftData?.thumbnail?.fileId||thumbnail?.fileId}`}
                    alt=""
                  />
                ) : (
                  <span className="w-20 border-2 bg-blue-200 overflow-hidden rounded h-16 inline-block"></span>
                )}
                {thumbnail?.fileId || draftData?.thumbnail?.fileId ? (
                  <span
                    onClick={() => handleDeleteThumbnail()}
                    className="absolute top-[35%] left-[35%] text-rose-600 bg-rose-100 cursor-pointer"
                  >
                    <IoClose size={20} />
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="text-sm">
                <p>{thumbnail?.originalFileName||draftData?.thumbnail?.originalFileName}</p>
                <p>{formatBytes(thumbnail?.fileSize||draftData?.thumbnail?.fileSize)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={()=>handleDraft()} className="px-6 py-2 rounded bg-gray-400 text-white font-bold">
                Draft
              </button>
              <button onClick={()=>handleSendMessage()} className="px-6 py-2 rounded bg-blue-500 text-white font-bold">
                Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default DeliveryModal;
