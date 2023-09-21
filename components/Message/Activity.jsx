import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsCheckLg, BsPen, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { MdAttachment } from "react-icons/md";
import CustomOfferModal from "./CustomOfferModal";

const Activity = () => {
  // action mode
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  // input value
  const [value, setValue] = useState("");

  // send value
  const [sendValue, setSendValue] = useState("");

  console.log(value);
  return (
    <div className="flex gap-6">
      <div className="w-full">
        <div className=" py-6 flex items-center gap-6 border-b border-gray-300 my-2">
          {/* Btns */}
          <button className="uppercase font-bold text-blue-500 border-b border-blue-500">
            Activity
          </button>
          <button className="uppercase font-bold text-black border-b border-transparent">
            Page Requirments
          </button>
        </div>
        {/* Body */}
        <div className="w-full">
          <div className="h-14 w-full bg-[#EFEFEF] pl-4 flex items-center">
            {/* Top bar */}
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-between w-full items-center leading-4">
                <div>
                  <strong>Client Name</strong>
                  <p className="text-xs">
                    Last seen 18 hourse ago | Local Time: May 29, 2023, 1:20 PM
                  </p>
                </div>
                <div>
                  <details className="dropdown dropdown-left md:dropdown-open md:dropdown-bottom">
                    <summary className="m-1 btn">
                      <BsThreeDotsVertical />
                    </summary>
                    <ul className="p-2 shadow dropdown-content z-[1] bg-base-100 rounded w-28">
                      <li className="w-20">
                        <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                          Star
                        </a>
                      </li>
                      <li className="w-20">
                        <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                          Block
                        </a>
                      </li>
                      <li className="w-20">
                        <a className="px-3 cursor-pointer py-2 inline-block hover:bg-gray-400 w-24">
                          Unblock
                        </a>
                      </li>
                    </ul>
                  </details>
                  {/* <button><BsThreeDotsVertical /></button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Message body */}
          <div className="overflow-y-auto h-auto max-h-[600px]">
            {/* Client */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Client Name{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* Me */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Me{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* client */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Client Name{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* Me */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Me{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* client */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Client Name{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* Me */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Me{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* client */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Client Name{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* Me */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Me{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
            {/* client */}
            <div className="flex w-full px-2 gap-2 py-3">
              <div className="w-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://dummyimage.com/60x60/aaaaaa/fff"
                  alt=""
                />
              </div>
              <div className="w-full">
                <strong>
                  Client Name{" "}
                  <span className="text-xs font-normal">
                    Apr 22, 2023, 7:33 PM
                  </span>
                </strong>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem nisi delectus minus. Minima debitis
                  reprehenderit dolor earum asperiores doloremque numquam quis
                  consectetur vel accusamus consequuntur deserunt explicabo
                  nostrum, adipisci culpa!
                </p>
              </div>
            </div>
          </div>
          {/* send box */}
          <div className="border border-gray-500 m-2">
            <div>
              <div className="p-2 m-2 ">
                {/* Quick Response */}
                <div>
                  <h2>Quick Response</h2>
                </div>
                <div className="flex ">
                  <div className="flex gap-2 text-[13px] flex-wrap">
                    <p
                      className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
                      value="before"
                    >
                      Before Final
                      <span>
                        <FiChevronDown />
                      </span>
                      {deleteMode ? (
                        <button className="px-1 py-1 rounded-full bg-rose-500 text-white">
                          <BsTrash />
                        </button>
                      ) : (
                        ""
                      )}
                      {editMode ? (
                        <button
                          className="px-1 py-1 rounded-full bg-blue-500 text-white"
                          onClick={() =>
                            document.getElementById("edit_modal").showModal()
                          }
                        >
                          <BsPen />
                        </button>
                      ) : (
                        ""
                      )}
                    </p>

                    <p
                      className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
                      value="before"
                    >
                      After Final
                      <span>
                        <FiChevronDown />
                      </span>
                    </p>
                    <p
                      className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
                      value="before"
                    >
                      My Service
                      <span>
                        <FiChevronDown />
                      </span>
                    </p>
                    <p
                      className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
                      value="before"
                    >
                      Chenge
                      <span>
                        <FiChevronDown />
                      </span>
                    </p>
                    <button
                      onClick={(e) => setValue(value + " " + e.target.value)}
                      className="px-1 flex items-center gap-1 py-0 border border-gray-500"
                      value="like td"
                    >
                      Like TD
                      <span>
                        <FiChevronDown />
                      </span>
                    </button>
                    <button
                      onClick={(e) => setValue(value + " " + e.target.value)}
                      className="px-1 flex items-center gap-1 py-0 border border-gray-500"
                      value="Chenge or Final"
                    >
                      Chenge or Final
                      <span>
                        <FiChevronDown />
                      </span>
                    </button>
                    {/* Add NEw */}
                    <button className="border border-gray-500 px-1 py-0 bg-white">
                      + Add New
                    </button>
                  </div>
                  <div>
                    {editMode ? (
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-1 py-0 text-teal-400  font-bold"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-1 py-0 text-blue-500 font-bold"
                      >
                        Edit
                      </button>
                    )}
                    {deleteMode ? (
                      <button
                        onClick={() => setDeleteMode(false)}
                        className="px-1 py-0 text-teal-400  font-bold"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setDeleteMode(true)}
                        className="px-1 py-0 text-rose-400  font-bold"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="w-full">
                  <textarea
                    defaultValue={value}
                    onChange={(e) =>
                      setSendValue(sendValue + " " + e.target.value)
                    }
                    onBlur={(e) => setValue(value + " " + e.target.value)}
                    id="sendbox"
                    className="w-full textarea textarea-bordered rounded-none"
                  ></textarea>
                </div>
                <div className="flex items-center ">
                  {/* Like */}
                  <button className="w-14 text-xl flex justify-center">
                    <AiFillLike size={29} />
                  </button>
                  <span className="pr-5 pl-3">|</span>
                  {/* Offer */}
                  <button
                    className="flex w-full gap-6 items-center"
                    onClick={() =>
                      document.getElementById("custom_offer").showModal()
                    }
                  >
                    <span>
                      <MdAttachment size={24} />
                    </span>
                    Create an offer
                  </button>
                  {/* send */}
                  <button className="w-20 px-4 font-bold text-blue-400">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="md:w-4/12 my-6 space-y-6">
        {/* Timer */}
        <div className="bg-blue-50 p-2 px-4">
          <h2 className="text-xl font-bold">Time left to deliver</h2>
          <div className="flex items-center">
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              01 <span>Days</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              01 <span>Hours</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              01 <span>Minutes</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              01 <span>Seconds</span>
            </p>
          </div>
          <button className="bg-blue-500 w-full text-center py-1 font-bold text-lg text-white">
            Deliver Now
          </button>
          <button className="text-center py-3 flex justify-center w-full">
            Extend delivery date
          </button>
        </div>
        {/* Project Details */}
        <div className="bg-blue-50 p-2 px-4">
          <h2 className="text-xl font-bold">Project Details</h2>
          <div className="flex gap-2 bg-white p-2">
            <img
              className="w-20 h-16"
              src="https://dummyimage.com/100x80/"
              alt=""
            />
            <div className="">
              <p>Door Hanger Design</p>
              <p className="text-green-500 font-bold">Ongoing</p>
            </div>
          </div>
          {/* Details */}
          <div className="pt-5">
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <p>Project by</p>
                <strong>Client Name</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Quantity</p>
                <strong>1</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Duration</p>
                <strong>2 Days</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Project Started</p>
                <strong>Jun 16, 8:19 AM</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Project Delivery</p>
                <strong>Jun 19, 8:19 AM</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Total Price</p>
                <strong>$50</strong>
              </li>
              <li className="flex items-center justify-between">
                <p>Project Number</p>
                <strong>#ZZIBN3</strong>
              </li>
            </ul>
            <hr className="py-3 border-blue-400 my-3" />
          </div>
          {/* Track Project */}
          <div className="">
            <div className="pb-3">
              <h2 className="text-xl font-bold">Track Project</h2>
            </div>
            <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
              <span className="absolute bg-blue-500 p-2 h-5 w-5 rounded-full -left-2.5">
                <BsCheckLg
                  size={16}
                  className="absolute left-0.5 top-0.5"
                  color="white"
                />
              </span>
              <p>Project Placed</p>
            </div>
            <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
              <span className="absolute bg-blue-500 p-2 h-5 w-5 rounded-full -left-2.5">
                <BsCheckLg
                  size={16}
                  className="absolute left-0.5 top-0.5"
                  color="white"
                />
              </span>
              <p>Project Placed</p>
            </div>
            <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
              <span className="absolute bg-blue-500 p-2 h-5 w-5 rounded-full -left-2.5"></span>
              <p>Project Placed</p>
            </div>
            <div className="relative ml-6 border-l pb-5 border-blue-500 pl-4">
              <span className="absolute border border-gray-500 bg-blue-50 p-2 h-5 w-5 rounded-full -left-2.5"></span>
              <p>Project Placed</p>
            </div>
            <div className="relative ml-6 border-l border-blue-500 pl-4">
              <span className="absolute border border-gray-500 bg-blue-50 p-2 h-5 w-5 rounded-full -left-2.5"></span>
              <p>Project Placed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="edit_modal" className="modal">
          <div className="modal-box w-80">
            <input
              type="text"
              className="px-4 w-full py-2 border border-gray-300 rounded-r-none rounded"
            />

            <div className="modal-action">
              <form method="dialog" className="flex gap-3 items-center">
                {/* if there is a button in form, it will close the modal */}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-none border  border-blue-200 hover:bg-gray-300 duration-300 rounded">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-l-none border  border-blue-500 rounded">
                  Update
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <CustomOfferModal />
    </div>
  );
};

export default Activity;
