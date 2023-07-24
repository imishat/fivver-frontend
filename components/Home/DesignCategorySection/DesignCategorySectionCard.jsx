import Link from "next/link";
import CompanyCard from "./CompanyCard";

const DesignCategorySectionCard = () => {
    return (
        <div>
            <div className="border px-4  pb-4 h-64 rounded-md">
                <div className="flex py-1 justify-between">
                    <h2 className="font-bold">Door Hanger Design</h2>
                    <Link className="text-blue-300 font-bold" href={'#'}>All Design</Link>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2 ">
                        {
                            [2,2,2].map(item=><CompanyCard />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignCategorySectionCard;