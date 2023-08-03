
const DesignTags = () => {
    return (
        <div>
             <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Solar</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Pressure Washing</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Real Estate</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Lawn Care</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Moving</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Cleaning Services</button></li>
                    <li><button className='bg-rose-200 text-black px-3 rounded-full'>Others</button></li>
                </ul>
            </div>
        </div>
    );
};

export default DesignTags;