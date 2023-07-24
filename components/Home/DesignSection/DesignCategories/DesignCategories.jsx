
const DesignCategories = () => {
    return (
        <div className="border-b-2 border-blue-400 ">
            <div className="my-6">
                {/* Design card */}
                <ul className='flex px-8 gap-2 flex-wrap'>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Buisness Card</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Door Hanger</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Flyer</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Postcard</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Brochure</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Billboard</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Yard Sign</button></li>
                    <li><button className='bg-blue-300 text-black px-3 rounded-full'>Orders</button></li>
                </ul>
            </div>
        </div>
    );
};

export default DesignCategories;