import { HiCheckCircle } from 'react-icons/hi2';
const PriceCard = ({data}) => {
    return (
        <div className="h-full sm:h-52 rounded-xl overflow-hidden border border-[#D4C9C9] relative">
            {/* Title */}
            <div className=" w-full bg-[#FFEFEF] flex justify-center items-center h-12 ">
                <h3 className="text-2xl font-bold">Door Hanger Design</h3>
            </div>
            {/* Prices */}
            <div className="flex flex-col sm:flex-row justify-around w-full items-center py-5">
                <div className='flex sm:justify-around justify-between sm:w-2/3 px-3'>
                <div>
                    <p className="sm:text-xl">Single Side Design</p>
                    <h3 className="text-center text-[#1B8CDC] sm:text-xl font-bold">$20 USD</h3>
                </div>
                <div className=''>
                    <p className="sm:text-xl">Double Sided Design</p>
                    <h3 className="text-center text-[#1B8CDC] sm:text-xl font-bold">$50 USD</h3>
                </div>
                </div>
                <div className="sm:w-40 sm:h-16 flex justify-center items-center">
                    <button className="w-full py-3 sm:py-0 px-2 h-full sm:text-lg font-semibold text-center uppercase text-white rounded-xl leading-5 bg-[#2791DD]">Project <br className='hidden sm:block' /> Start Here</button>
                </div>
            </div>
            <div>
                <ul className="sm:flex justify-around">
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>Unlimited Revisions</li>
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>PSD Source File</li>
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>Print Ready PDF or JPEG File</li>
                </ul>
            </div>
        </div>
    );
};

export default PriceCard;