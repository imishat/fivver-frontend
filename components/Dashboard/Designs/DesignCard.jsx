import moment from "moment";
import Link from "next/link";

const DesignCard = ({project}) => {

    // const getUserById = 
    return (
      <div className=" bg-[#F4F9FF] border border-gray-400 p-4">
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
                        <Link className="font-bold text-lg text-[#e64784]" href={'#'}>Delete</Link>
                    </li>
                </ul>
            </div>
        </div>
       
      </div>
    );
};

export default DesignCard;