import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useCreateMessage } from "@/components/queries/mutation/message.mutation";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAttach } from "react-icons/io";
import { useSelector } from "react-redux";

const Contact=()=>{
 
  // react hook form
  const { handleSubmit, register, reset } = useForm();

  // image upload call
  const { mutate: sendFileData } = useUploadFile({ watermark: false });

  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { showToast, Toast } = useToast();

  const [fileId, setFileId] = useState('')
  // upload design
  const handleUploadDesignFile = (e) => {
    const photo = e.target.files
    const photoData = new FormData();

    photoData.append("files", photo[0]);
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files[0];
        showToast("Photo Uploaded", "success");
        setFileId(images?.fileId)

      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  }

  // create useCreateInquiries
  const { mutate: createMessage } = useCreateMessage();

  /// handle send message
  const handleSendMessage = (data) => {
    const messageData = {
      type: "start",
      name: data?.name,
      email: data?.email,
      website: data?.website,
      favoriteDesign: data?.design,
      designFile: fileId,
      projectId: "",
      isRead: false,
      receiverId: "sa0",
      sender: {
        senderId: user?.userId,
        name: user?.fullName,
        profilePicture: user?.profilePicture,
      },
      content: data?.message,
    };
    createMessage(messageData, {
      onSuccess: (res) => {
        showToast("Message send to Admin", "success");
        reset();
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
      },
    });
  };
    return(
<> <Toast />
        <div className="max-w-2xl mx-auto">
        
        <div className=" flex justify-center text-center py-4">
          <div className="md:text-2xl font-semibold">
            
            <p className="text-black">If you would like to take a template/source file of any design
. </p>
            <p className="text-black">  we have created, please contact us, and show us the design you like. </p>
            <p className="text-black"> We will give you the template/source file </p>
          </div>
        </div>
      </div>
        <div className='w-2/5 mx-auto'>
      
            <div className="flex justify-center justify-items-center  mb-10 mt-10 mx-10 items-center">
            <form
                      onSubmit={handleSubmit(handleSendMessage)}
                      className="w-[100%] mx-auto relative rounded-md bg-rose-100 text-black p-6"
                    >
                      <div className="space-y-3">
                        <label htmlFor="name"></label>
                        <input
                          {...register("name", { required: "true" })}
                          placeholder="Name"
                          className="input input-bordered rounded-none w-full"
                          type="text"
                          id="name"
                        />
                        <label htmlFor="email"></label>
                        <input
                          {...register("email", { required: "true" })}
                          placeholder="Email"
                          className="input input-bordered rounded-none w-full"
                          type="email"
                          id="email"
                        />
                        <label htmlFor="website"></label>
                        <input
                          {...register("website", { required: "true" })}
                          placeholder="Website / Facebook"
                          className="input input-bordered rounded-none w-full"
                          type="text"
                          id="website"
                        />
                        <label htmlFor="design" className="relative">
                          <input
                            {...register("design", { required: "true" })}
                            placeholder="Example Design"
                            className="input input-bordered rounded-none w-full"
                            type="text"
                            id="design"
                          />
                          <label htmlFor="designFile" className="absolute right-3 z-30 cursor-pointer  -top-1">
                            <input onChange={(e) => handleUploadDesignFile(e)} hidden type="file" id="designFile" />
                            <IoIosAttach size={30} />
                          </label>
                        </label>

                        <label htmlFor="message"></label>
                        <textarea
                          {...register("message", { required: "true" })}
                          placeholder="Message"
                          id="message"
                          className="textarea h-24 textarea-bordered w-full rounded-none"
                        ></textarea>
                        <div className="flex justify-center w-full">
                          <button className="px-4 py-2 rounded-sm mx-auto bg-blue-500">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
        </div>
        

</div>
</>
    )
}
export default Contact