import { useGetFile } from "@/components/queries/query/getFiles.queries";

function SingleFile({file}) {

    // get single image
    const {data:singleImage} = useGetFile({fileId:file})
    // console.log(singleImage)
    return (
        <div>
           <img src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${file}`} target="_blank" rel="noopener noreferrer" className="w-full h-44 object-cover"/>
        </div>
    );
}

export default SingleFile;