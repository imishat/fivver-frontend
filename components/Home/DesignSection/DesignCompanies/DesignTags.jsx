import Link from "next/link";

const DesignTags = () => {
    return (
        <div>
             <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    <li><Link href={'/designs/Solar'} className='bg-rose-200 text-black px-3 rounded-full'>Solar</Link></li>
                    <li><Link href={'/designs/Pressure Washing'} className='bg-rose-200 text-black px-3 rounded-full'>Pressure Washing</Link></li>
                    <li><Link href={'/designs/Real Estate'} className='bg-rose-200 text-black px-3 rounded-full'>Real Estate</Link></li>
                    <li><Link href={'/designs/Lawn Care'} className='bg-rose-200 text-black px-3 rounded-full'>Lawn Care</Link></li>
                    <li><Link href={'/designs/Moving'} className='bg-rose-200 text-black px-3 rounded-full'>Moving</Link></li>
                    <li><Link href={'/designs/Cleaning Services'} className='bg-rose-200 text-black px-3 rounded-full'>Cleaning Services</Link></li>
                    <li><Link href={'/designs/Others'} className='bg-rose-200 text-black px-3 rounded-full'>Others</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DesignTags;