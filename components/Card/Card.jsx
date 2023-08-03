import Link from "next/link";

const Card = ({data}) => {
    return (
        <div className="border border-gray-300">
            <div className="bg-rose-100 h-40 w-full">
                <img className="w-full h-40" src={data?.thumb} alt="" />
            </div>
            <Link href={`${data?.url}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default Card;