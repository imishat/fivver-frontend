import Link from "next/link";

const DesignCategories = () => {
    return (
        <div className="border-b-2 border-blue-400 ">
            <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    <li><Link href={'/designs/Buisness Card'} className='bg-[#dceefa] text-black px-3 rounded-full p-2'>Buisness Card</Link></li>
                    <li><Link href={'/designs/Door Hanger'} className='bg-[#dceefa]   text-black px-3 rounded-full p-2'>Door Hanger</Link></li>
                    <li><Link href={'/designs/Flyer'} className='bg-[#dceefa]  text-black px-3 rounded-full p-2'>Flyer</Link></li>
                    <li><Link href={'/designs/Postcard'} className='bg-[#dceefa] text-black px-3 rounded-full p-2'>Postcard</Link></li>
                    <li><Link href={'/designs/Brochure'} className='bg-[#dceefa]  text-black px-3 rounded-full p-2'>Brochure</Link></li>
                    <li><Link href={'/designs/Billboard'} className='bg-[#dceefa]  text-black px-3 rounded-full p-2'>Billboard</Link></li>
                    <li><Link href={'/designs/Yard Sign'} className='bg-[#dceefa]  text-black px-3 rounded-full p-2'>Yard Sign</Link></li>
                    <li><Link href={'/designs/Orders'} className='bg-[#dceefa] text-black px-3 rounded-full p-2'>Orders</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DesignCategories;