import Link from "next/link";

const DesignDescription = () => {
    return (
        <div>
            <div className="w-full flex justify-center my-12 md:gap-4">
                <div className="w-[640] h-[480]"><img className="w-full h-full" src="https://dummyimage.com/640x4:3/" alt="" /></div>
                <div className="w-72 p-4 bg-[#F2F9FF]">
                    <div>
                        <h1 className="text-4xl font-bold">Pressure & Soft Washing Door Hanger Design</h1>
                    </div>
                    <div className="my-16">
                        <ul>
                            <li className="flex gap-1"><p className="font-bold">Size:</p> 4.5x11, + 0.25 bleed</li>
                            <li className="flex gap-1"><p className="font-bold">File Format:</p> Photoshop File</li>
                            <li className="flex gap-1"><p className="font-bold">Design:</p> Dubble Sidded Door Hanger Design</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <button className="py-2 w-full hover:bg-blue-200 duration-300 border-2 rounded-full border-blue-400 text-[#1B8CDC] font-bold text-xl">Add to cart</button>
                        <button className="py-2 w-full hover:bg-blue-600 duration-300 text-white font-bold border bg-[#1B8CDC] rounded-full border-blue-400 text-xl">Project Start</button>
                    </div>
                </div>
            </div>
            <div className="px-8">
                <h2 className="text-3xl font-semibold my-3">Pressure & Soft Washing Door Hanger Design</h2>
                <p className="my-4">This Door Hanger Design is specially created for Pressure & Soft Washing Services. You can definitely use this design for any other service/company if you want. If you give me all the information of your design, then | will edit this design according to your information. Or if you want to create a different design according to your information instead of this design, then | can create your design. Please start a project for your design. If you feeling any difficulties while starting the project, or if you have any questions. Then feel FREE to contact us.</p>
                <h3 className="text-2xl font-bold my-8 ">If you just want to get the template/source file of this design, <br /> then you can <Link href={'#'} className="border-b border-black">contact us by clicking here.</Link> And show us this design.</h3>
            </div>
        </div>
    );
};

export default DesignDescription;