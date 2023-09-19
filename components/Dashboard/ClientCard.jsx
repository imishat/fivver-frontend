import Link from "next/link";

const ClientCard = ({project}) => {

    // const getUserById = 
    return (
        <div className="sm:flex justify-between bg-[#F4F9FF] items-center border border-gray-400 p-4">
            <div className="sm:flex items-center gap-4">
                <div className="sm:w-24 h-44 sm:h-16 w-full">
                    <img className="object-cover w-full h-full" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${project?.imageIds[0]}`} alt="" />
                </div>
                <div className="flex py-3 sm:py-0 items-center gap-2">
                    <img className="object-cover w-8 h-8 rounded-full" src="https://dummyimage.com/20x20" alt="" />
                    <p className="font-bold">{project?.startedBy}</p>
                </div>
            </div>
            <div className=" sm:w-6/12">
                <ul className="flex justify-between w-full items-center">
                    <li className="text-center">
                        <p>Price</p>
                        <span className="font-bold text-lg">${project?.totalCost}</span>
                    </li>
                    <li className="text-center">
                        <p>Time</p>
                        <span className="font-bold text-lg">1 day late</span>
                    </li>
                    <li className="text-center">
                        <p>Status</p>
                        <span className="font-bold text-lg text-[#DA560A]">{project?.status}</span>
                    </li>
                    <li>
                        <Link className="font-bold text-lg text-[#1C8DDD]" href={'#'}>View</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ClientCard;