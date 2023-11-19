import SocialIcons from "@/components/CustomarProfile/SocialIcons";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useCreateMessage } from "@/components/queries/mutation/message.mutation";
import useToast from "@/components/utility/useToast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFacebook } from "react-icons/bs";
import { IoIosAttach } from "react-icons/io";
import { useSelector } from "react-redux";

const Footer = () => {
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
  return (
    <div>
      <Toast />
      {router.asPath !== "/" ? (
        <div>
          {/* Email */}
          <div className="bg-[#1781CB] py-2 md:text-2xl text-white flex gap-4 px-6">
            <p>Email: </p> <p>mahfujurrahman535@gmail.com</p>
          </div>
          {/* Main Footer */}
          <div className="bg-black">
            <div className="flex text-white justify-between items-center border-b pb-3 md:px-6 md:mx-5">
              <div className="flex flex-col w-44 space-y-3">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img
                      src="/images/MR Logo Final 4.png"
                      className="w-full lg:w-4/5 h-full"
                      alt=""
                    />
                  </div>
                  {/* <h2 className="text-lg font-bold">mahfujurrahman535</h2>
                        <p>Graphic Designer</p> */}
                </div>
                {/* Social icons */}
                {/* <div className="flex justify-center">
                  <ul className="md:flex grid grid-cols-3 md:gap-2 gap-1 items-center">
                    <li>
                      <a
                        className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block"
                        href="#"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block"
                        href="#"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block"
                        href="#"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block"
                        href="#"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block"
                        href="#"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="py-3 w-full mx-auto">
                <ul className="grid grid-cols-2 md:grid-cols-4 w-full justify-between">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>

                  <li>
                    <Link href={"/desing"}>Designs</Link>
                  </li>
                  <li>
                    <Link href={"/price-list"}>Price List</Link>
                  </li>
                  <li>
                    <Link href={"/contact"}>Contact</Link>
                  </li>
                  <li>
                    <Link href={"/about"}>About</Link>
                  </li>
                  <li>
                    <Link href={"/desing"}>Companies</Link>
                  </li>

                  <li>
                    <Link href={"#"}>Project</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Affiliate</Link>
                  </li>
                </ul>
                <div className="w-12 my-6 border-b"></div>
                <p className="md:text-xl">
                  Email: <span>example@gmail.com</span>
                </p>
              </div>
            </div>
            <div className=" text-white px-6 py-4">
              <div className="flex gap-4 items-center">
                <Link href={"/auth/condition"}>Terms and Conditions</Link>|
                <Link href={"/privicy"}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Email */}
          <div className="bg-[#1781CB] py-2 md:text-2xl text-white flex gap-4 px-6">
            <p>Email: </p> <p>mahfujurrahman535@gmail.com</p>
          </div>
          {/* Main Footer */}
          <div className="bg-black">
            <div className="md:flex text-white sm:h-72 justify-center mx-auto w-full md:justify-between items-center border-b pb-3 md:px-6 md:mx-5">
              <div className="flex flex-col md:w-4/12 space-y-3">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img
                      src="/images/MR Logo Final 4.png"
                      className="w-full lg:w-4/5"
                      alt=""
                    />
                  </div>
                  {/* <h2 className="text-lg font-bold">mahfujurrahman535</h2>
                    <p>Graphic Designer</p> */}
                </div>
                {/* Social icons */}
                <div className="flex justify-center">
                  <SocialIcons size={20}/>
                </div>
              </div>
              <div
                className={`${user?.email
                    ? "py-3 md:w-6/12 w-full text-center"
                    : "py-3 md:w-9/12 w-full text-center"
                  }`}
              >
                <ul
                  className={`${user?.email
                      ? "lg:grid grid-cols-2 md:grid-cols-4 mt-20 flex items-center flex-wrap px-12 gap-3 sm:flex sm:flex-col  space-y-2 w-full justify-between"
                      : "flex md:grid md:flex-wrap grid-cols-2"
                    }`}
                >
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>

                  <li>
                    <Link href={"/design"}>Designs</Link>
                  </li>
                  <li>
                    <Link href={"/price-list"}>Price List</Link>
                  </li>
                  <li>
                    <Link href={"/contact"}>Contact</Link>
                  </li>
                  <li>
                    <Link href={"/about"}>About</Link>
                  </li>
                  <li>
                    <Link href={"/desing"}>Companies</Link>
                  </li>

                  <li>
                    <Link href={"#"}>Project</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Affiliate</Link>
                  </li>
                </ul>
              </div>
              {/* Message send form */}
              <div className={` flex justify-center w-full sm:w-6/12 `}>
                {user?.email ? (
                  <div className="flex mx-auto sm:w-96 flex-col right-0 bottom-12 md:relative h-fit rounded-md md:justify-end mr-1">
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
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className=" text-white px-6 py-4">
              <div className="flex gap-4 items-center">
                <Link href={"auth/condition"}>Terms and Conditions</Link>|
                <Link href={"#"}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
