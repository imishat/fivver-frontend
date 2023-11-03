import { useGetFile } from "@/components/queries/query/getFiles.queries";
import Link from "next/link";
import { useDispatch } from "react-redux";

function SingleFile({file,message}) {
    const dispatch = useDispatch();
    // get single image
    const {data:singleImage} = useGetFile({fileId:file})
    // console.log(singleImage)
    return (
        <div>
             <Link href={`${process.env.NEXT_PUBLIC_API}/files/download/public/${file}`} target="_blank">
             <img src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${file}`} target="_blank" rel="noopener noreferrer" className="w-full h-44 object-cover"/>
             </Link>
        </div>
    );
}

export default SingleFile;