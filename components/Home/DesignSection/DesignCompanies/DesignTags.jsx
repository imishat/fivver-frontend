import { useGetCompanies } from "@/components/queries/query/getCompanies.query";
import Link from "next/link";

const DesignTags = () => {
    const { data: companyData } = useGetCompanies({ companyId: "" })
    const companies = companyData?.data?.companies
    return (
        <div>
            <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    {
                        companies?.map((company, i) => {
                            return <li key={i}><Link href={`/designs/company/${company?.value}`} className='bg-[#ffefef] text-black px-3 p-2 rounded-full'>{company?.label}</Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default DesignTags;