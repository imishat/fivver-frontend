import { useGetFile } from "@/components/queries/query/getFiles.queries";
import { useEffect, useState } from "react";

function ImageModal({id}) {
 const [image,setImage] = useState({})
 useEffect(()=>{
  if(id){
    const {data:imageInfo} = useGetFile({fileId:id})
    setImage(imageInfo?.data?.file)
   }
 },[])
  return (
    <div>
      <dialog id="image_modal" className="modal">
        <div className="modal-box w-full max-w-7xl min-w-fit">
          <h3 className="font-bold text-lg">{image?.originalFileName}</h3>
          <p className="py-4">{`Press ESC key or click outside to close`}</p>
          <form method="dialog">
          <button className="btn ">close</button>
        </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ImageModal;
