import { useGetFile } from "@/components/queries/query/getFiles.queries";
import { messageData } from "@/components/redux/features/message/messageSlice";
import { useDispatch } from "react-redux";
import ImageModal from "../MessageImage/ImageModal";

function SingleFile({file,message}) {
    const dispatch = useDispatch();
    // get single image
    const {data:singleImage} = useGetFile({fileId:file})
    // console.log(singleImage)
    return (
        <div>
             <label  onClick={() => {
                          dispatch(messageData(message))
                        }}
                        htmlFor="image_modal"
                        className="relative"
                      >
                         <img src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${file}`} target="_blank" rel="noopener noreferrer" className="w-full h-44 object-cover"/>
                          <div className="absolute left-0 top-0 px-2 m-1 py-0 backdrop-blur-lg rounded-full border">{message?.comments?.length} Comments</div>
                      </label>
                      <ImageModal 
        messageId={message?.messageId}
      />
        </div>
    );
}

export default SingleFile;