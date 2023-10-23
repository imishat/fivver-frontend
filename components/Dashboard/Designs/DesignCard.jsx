import { useDeleteDEsing } from "@/components/queries/mutation/design.mutation";
import useToast from "@/components/utility/useToast";
import { CREATE_DESIGN } from "@/components/utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";

const DesignCard = ({project}) => {
   
    const {mutate}= useDeleteDEsing()
    // refatch all desing
    const queryClient = useQueryClient();
    const { Toast, showToast } = useToast();

    const handleDelete=(id)=>{

        mutate(id, {
          onSuccess:() => {
            queryClient.invalidateQueries([CREATE_DESIGN ])
            showToast('Delete Desing Successfully', 'success');
          },
          onError: (err) => {
            showToast(err?.response?.data?.message,"Error");
          },
        })
    
      }

    // const getUserById = 
    return (
      <div className=" bg-[#F4F9FF] border border-gray-400 p-4">
        <Toast />
          <div className="sm:flex justify-between items-center ">
            <div className="sm:flex items-center gap-4">
                <div className="sm:w-24 h-44 sm:h-16 w-full">
                    <img className="object-cover w-full h-full" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.imageIds[0]}`} alt="" />
                </div>
                <div className="flex py-3 sm:py-0 items-center gap-2">
                    <p className="font-bold">{project?.title}
                    <br />
                    <span className="font-normal text-sm">{project?.categoryName}</span>
                    </p>
                </div>
            </div>
            <div className=" sm:w-6/12">
                <ul className="flex justify-between w-full items-center">
                    <li className="text-center">
                        <p>Time</p>
                        <span className="font-bold text-lg">{moment(project.createdAt).fromNow()}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <Link className="font-bold text-lg text-[#1C8DDD]" href={`/update/design/${project.designId}`}>Edit</Link>
                        <div  onClick={() => handleDelete(project?.designId
)}className="font-bold text-lg text-[#e64784] cursor-pointer" >Delete</div>
                    </li>
                </ul>
            </div>
        </div>
       
      </div>
    );
};

export default DesignCard;