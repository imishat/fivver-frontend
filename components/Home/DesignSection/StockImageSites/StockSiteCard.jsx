import Link from "next/link";

const StockSiteCard = ({item}) => {
    return (
        <div className="rounded-lg border  !m-0 border-gray-500 overflow-hidden">
            <div className="h-32 flex justify-center px-2 items-center bg-white">
                <img className="w-full" src={item?.image} alt="" />
            </div>
            <div>
                <Link href={item?.url} target="_blank">
                <button className="w-full bg-gray-400 rounded-b-lg text-white py-1 text-xl">Click Here</button>
                </Link>
            </div>
        </div>
    );
};

export default StockSiteCard;