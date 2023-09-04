import Link from "next/link";

const RelatedDesignCard = ({data}) => {
    
    return (
        <div className="border border-gray-300">
            <div className="bg-rose-100 h-40 w-full">
                <img className="w-full h-40" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${data?.featuredImageId}`} alt="" />
            </div>
            <Link href={`/design/${data?._id}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default RelatedDesignCard;