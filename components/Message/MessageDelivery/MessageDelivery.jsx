import { useGetProject } from "@/components/queries/query/project.query";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { useSelector } from "react-redux";
import ImageModal from "../MessageImage/ImageModal";


function MessageDelivery({ message, setReply }) {
  // get user
  const { user } = useSelector((state) => state.user);

  // get project by id
  const {data: projectData} = useGetProject({status:'',search:'',projectId:message?.projectId})
  const project = projectData?.data?.project

  // kb convert
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Kb",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // auto zip downloader
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFiles = async () => {
    const res = await fetch("/api/files");
    const files = await res.json();

    setFiles(files);
  };

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadResourcesOnClick = async () => {
    setLoading(true);
    try {
      const zip = new JSZip();
      const remoteZips = message?.sourceFiles?.map(async (file) => {
        const response = await fetch(`http://103.49.169.89:30912/api/v1.0/files/download/public/${file?.fileId}`);
        const data = await response.blob();
        zip.file(`${file?.originalFileName}.${file?.fileExtension}`, data);

        return data;
      });

      Promise.all(remoteZips)
        .then(() => {
          zip.generateAsync({ type: "blob" }).then((content) => {
            // give the zip file a name
            saveAs(content, `${project?.title}.zip`);
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

// image id
const [imageId,setImageId]  = useState('')
  return (
    <div>
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
            <Link href={`/user/${message?.sender?.userId}`}>
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
                      <button className="btn" onClick={()=>{
                        document.getElementById('image_modal').showModal()
                        setImageId(message?.thumbnail?.fileId)
                      }
                        }>
                     <img
                        className="w-full object-cover h-96"
                        src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${message?.thumbnail?.fileId}`}
                        alt=""
                      /></button>
                    </div>
                    <div>
                      {/* Download Button */}
                      <div className="flex justify-center my-6">
                        <span onClick={downloadResourcesOnClick} disabled={loading} className=" px-8 py-1 rounded-full border border-gray-500">{loading?'Processing':'Download'}</span>
                      </div>
                      {/* Accept and Revision Button */}
                      <p>This watermark will no longer show after accepting the delivery file.
                      Please accept your final file first, then download the files.
                      </p>
                      <div className="flex justify-center mt-6 gap-6">
                        <button className="px-6 py-1 rounded-full bg-blue-400 text-white font-bold">Accept</button>
                        <button className="px-6 py-1 rounded-full bg-gray-400 text-white font-bold">Revision</button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[40%]">
                    {/* Thumbnail / Preview Image */}
                    <div className="text-left mb-4  w-full">
                      <h2 className="text-lg font-bold ">Final Files</h2>
                    </div>
                    <div className="w-full">
                      <p className="font-semibold">
                        {message?.thumbnail?.originalFileName}
                        <span className="font-normal">
                          {" "}
                          ({formatBytes(message?.thumbnail?.fileSize)})
                        </span>
                      </p>
                    </div>
                    <hr className="my-6 border-gray-500 w-12 " />
                    {/* Source files */}
                    <div className="w-full">
                      {
                        message?.sourceFiles?.map(file=>{
                         return <div className="w-full">
                           <p key={file?.fileId} className="font-semibold text-left text-ellipsis overflow-hidden">
                         {file?.originalFileName}
                         <span  className="font-normal"> ({formatBytes(file?.fileSize)})</span>
                       </p>
                         </div>

                        })
                      }
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
      <ImageModal id={imageId} />
    </div>
  );
}

export default MessageDelivery;
