import Link from "next/link";

const ClientCard = () => {
    return (
        <div className="flex justify-between items-center border border-gray-400 p-4">
            <div className="flex items-center gap-4">
                <div className="w-24 h-16">
                    <img className="w-full h-full" src="https://dummyimage.com/100x70" alt="" />
                </div>
                <div className="flex items-center gap-2">
                    <img className="w-8 h-8 rounded-full" src="https://dummyimage.com/20x20" alt="" />
                    <p className="font-bold">Client Name</p>
                </div>
            </div>
            <div className=" w-6/12">
                <ul className="flex justify-between w-full items-center">
                    <li className="text-center">
                        <p>Price</p>
                        <span className="font-bold text-lg">$30</span>
                    </li>
                    <li className="text-center">
                        <p>Time</p>
                        <span className="font-bold text-lg">1 day late</span>
                    </li>
                    <li className="text-center">
                        <p>Status</p>
                        <span className="font-bold text-lg text-[#DA560A]">Revision</span>
                    </li>
                    <li>
                        <Link className="font-bold text-lg text-[#1C8DDD]" href={'#'}>Price</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ClientCard;