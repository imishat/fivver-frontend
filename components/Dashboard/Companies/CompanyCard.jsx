import moment from "moment";
import Link from "next/link";

const CompanyCard = ({company}) => {
    console.log(company)
    return (
        <div className=" bg-[#F4F9FF] border border-gray-400 p-4">
          <div className="sm:flex justify-between items-center ">
            <div className="sm:flex items-center gap-4">
                <div className="flex py-3 sm:py-0 items-center gap-2">
                    <p className="font-bold">{company?.label}
                    <br /> <span className="font-normal text-sm mr-1  px-1">{company?.value}</span>
                   
                    </p>
                </div>
            </div>
            <div className=" sm:w-6/12">
                <ul className="flex justify-between w-full items-center">
                    <li className="text-center">
                        <p>Time</p>
                        <span className="font-bold text-lg">{moment(company.createdAt).fromNow()}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <Link className="font-bold text-lg text-[#1C8DDD]" href={`/update/company/${company.companyId}`}>Edit</Link>
                        <Link className="font-bold text-lg text-[#e64784]" href={'#'}>Delete</Link>
                    </li>
                </ul>
            </div>
        </div>
       
      </div>
    );
};

export default CompanyCard;