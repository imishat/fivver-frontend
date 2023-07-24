import Link from "next/link";
import CompanyCard from "./CompanyCard";

const DesignCategorySectionCard = () => {
    return (
        <div>
            <div className="border px-4 pt-2 pb-4 rounded-md">
                <div className="flex justify-between py-2">
                    <h2>Door Hanger Design</h2>
                    <Link href={'#'}>All Design</Link>
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