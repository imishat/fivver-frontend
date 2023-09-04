import StockImageSites from "@/components/Home/DesignSection/StockImageSites/StockImageSites";
import { useForm } from "react-hook-form";
import { MdOutlineAttachment } from 'react-icons/md';
const Requirment = () => {
    // react hook form
    const {register,handleSubmit,formState:{errors}} = useForm()

    /// handle submit requirment
    const handleRequirment = data =>{
        console.log(data)
    }
    return (
        <div className="md:flex gap-6 my-8 justify-between">
            <div className="md:w-9/12 flex justify-center">
                  
                <div className="text-center">
                  {/* Title */}
                <div className="md:w-9/12 px-2 mx-auto my-6">
                <h2 className="text-xl font-semibold">Please attach to the questions below, so that we can create the design with your own information</h2>
                </div>
                <div className="md:w-4/5 mx-auto">
                        {/* body */}
                        <form onSubmit={handleSubmit(handleRequirment)}>
                            <div className="w-full bg-[#1B8CDC] py-3 flex justify-center text-xl font-bold text-white">Project Requirment</div>
                            {/* Industry */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>Which industry do you work in?</label>
                                        <textarea {...register("industry",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="fileWork">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="fileWork" />
                                    </label>
                                </div>
                            </div>
                            {/* Company Logo */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>
                                        Do you have your own/company logo?</label>
                                        <textarea {...register("companyLogo",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="fileLogo">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="fileLogo" />
                                    </label>
                                </div>
                            </div>
                            {/* Company Website */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>
                                        Do you have own/company website?</label>
                                        <textarea {...register("website",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="fileWebsite">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="fileWebsite" />
                                    </label>
                                </div>
                            </div>
                            {/* Deisgn Idea */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>
                                        Do you have any imaginary or specific design idea?</label>
                                        <textarea {...register("designIdea",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="file">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="file" />
                                    </label>
                                </div>
                            </div>
                            {/* Deisgn Size */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>Do you have your specific design size?</label>
                                        <textarea {...register("designSize",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="file">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="file" />
                                    </label>
                                </div>
                            </div>
                            {/* Deisgn Information */}
                            <div className="text-left px-3 bg-[#F2F9FF] py-4">
                                <div className="text-left">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="industry" className="font-bold flex items-center gap-2 px-3 py-2"><span className="text-blue-400">1.</span>
                                        You have to give clear information that you need in the design. <br />
                                        (For example, all texts, all photos, logo, contact info, etc.) you work in?</label>
                                        <textarea {...register("designInfo",{required:true})} className="textarea rounded-none textarea-bordered"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center py-2 px-3 gap-1" htmlFor="file">
                                    <span><MdOutlineAttachment /></span>
                                    <p>Attachments</p>
                                    <input hidden type="file" id="file" />
                                    </label>
                                </div>
                            </div>
                            {/* btn */}
                            <div className="px-3  bg-[#F2F9FF] py-4">
                                <button className="py-2 w-full font-bold text-white text-2xl flex justify-center bg-[#1B8CDC]">Start Now</button>
                            </div>
                            {/* Hint */}
                            <div className=" bg-[#F2F9FF] py-4">
                                <p>Start your project by clicking "Start Now"</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Stock */}
            <div className="md:w-3/12">
                <StockImageSites />
            </div>
        </div>
    );
};

export default Requirment;