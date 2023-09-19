import Link from "next/link";
import { PiStarLight } from "react-icons/pi";

const Feedback = () => {
    return (
        <div className="mt-6 lg:mx-20 md:flex gap-12 justify-between">
            <div className="md:w-7/12">
                <div className="pb-5 border-b mx-4 md:mx-0 border-black">
                    <h2 className="text-3xl font-bold">Public Feedback</h2>
                    <p>Please share your valuable experience with this project.</p>
                </div>
                <div className="flex w-full justify-center my-10">
                    <button><PiStarLight size={44} /></button>
                    <button><PiStarLight size={44} /></button>
                    <button><PiStarLight size={44} /></button>
                    <button><PiStarLight size={44} /></button>
                    <button><PiStarLight size={44} /></button>
                </div>
                <div>
                    <div className="md:flex mx-4 md:mx-0 items-center gap-2">
                        <div className="w-full">
                            <textarea placeholder="Type your experience" className="w-full p-3 h-36 border-gray-500 border"></textarea>
                        </div>
                        <div className="md:w-56">
                            <p className="text-base text-center">Add you review</p>
                            <label htmlFor='item' className="w-full h-32 inline-block relative bg-rose-100 mb-2">
                                <input className="absolute checkbox rounded-none bg-white checkbox-info checkbox-sm right-1 bottom-1" type="checkbox" id="item" />
                            </label>
                        </div>
                    </div>
                    <div className="flex mb-12 items-center mt-6">
                      <div className="w-full flex items-center justify-center">
                      <button className="bg-blue-500 md:w-60 px-3 py-1 text-2xl font-bold text-white rounded">Send Feedback</button>
                      </div>
                        <p className="md:w-10 w-20 cursor-pointer">Skip</p>
                    </div>
                </div>
            </div>
            {/* Project details */}
            <div className="h-full md:w-80">
               <div className="bg-blue-50 p-4">
               <div>
                    <h2 className="text-xl font-bold py-2">Project Details</h2>
                </div>
                <div className="flex bg-white p-1 px-2">
                    <img src="" className="bg-rose-100 w-20 h-16 m-2" alt="" />
                    <div>
                        <p className="leading-5 py-1">Door hanger design</p>
                        <Link className="text-blue-500 font-bold" href={'#'}>Completed</Link>
                    </div>
                </div>
                <div className="mt-6">
                    <ul>
                        <li className="flex py-1 items-center justify-between w-full">
                            <p>Project by</p>
                            <strong>Client Name</strong>
                        </li>
                        <li className="flex py-1 items-center justify-between w-full">
                            <p>Quantity</p>
                            <strong>1</strong>
                        </li>
                        <li className="flex py-1 items-center justify-between w-full">
                            <p>Duration</p>
                            <strong>2 Days</strong>
                        </li>
                        <li className="flex py-1 items-center justify-between w-full">
                            <p>Total Price</p>
                            <strong>$40</strong>
                        </li>
                        <li className="flex py-1 items-center justify-between w-full">
                            <p>Project Number</p>
                            <strong>#ZZ1B5</strong>
                        </li>
                    </ul>
                </div>
               </div>
                {/* Back btn */}
                <div className="my-12 font-bold flex justify-center">
                    <Link className="text-xl" href={'#'}>Back to the project page</Link>
                </div>
            </div>
            
        </div>
    );
};

export default Feedback;