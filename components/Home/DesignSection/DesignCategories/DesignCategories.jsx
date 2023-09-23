import Link from "next/link";

const DesignCategories = () => {
    return (
        <div className="border-b-2 border-blue-400 ">
            <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    <li><Link href={'/designs/Buisness Card'} className='bg-blue-300 text-black px-3 rounded-full'>Buisness Card</Link></li>
                    <li><Link href={'/designs/Door Hanger'} className='bg-blue-300 text-black px-3 rounded-full'>Door Hanger</Link></li>
                    <li><Link href={'/designs/Flyer'} className='bg-blue-300 text-black px-3 rounded-full'>Flyer</Link></li>
                    <li><Link href={'/designs/Postcard'} className='bg-blue-300 text-black px-3 rounded-full'>Postcard</Link></li>
                    <li><Link href={'/designs/Brochure'} className='bg-blue-300 text-black px-3 rounded-full'>Brochure</Link></li>
                    <li><Link href={'/designs/Billboard'} className='bg-blue-300 text-black px-3 rounded-full'>Billboard</Link></li>
                    <li><Link href={'/designs/Yard Sign'} className='bg-blue-300 text-black px-3 rounded-full'>Yard Sign</Link></li>
                    <li><Link href={'/designs/Orders'} className='bg-blue-300 text-black px-3 rounded-full'>Orders</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DesignCategories;