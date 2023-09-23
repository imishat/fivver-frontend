import { AiFillLike } from "react-icons/ai";
import {
    BsClock,
    BsSearch,
    BsStar,
    BsStarFill,
    BsThreeDotsVertical,
} from "react-icons/bs";
import { MdAttachment } from "react-icons/md";

const Message = () => {
  return (
    <div className="md:w-[90%] mx-auto my-12 md:flex">
      <div className="md:w-8/12 ">
        <div className="h-14 w-full bg-[#CCE5FB] px-4 flex items-center">
          {/* filter */}
          <div className="flex items-center justify-between w-full">
            <span>
              <BsSearch />
            </span>
            <select className="bg-white border border-gray-400 px-2 py-1">
              <option value="all">All Conversations</option>
              <option value="unread">Unread</option>
              <option value="starred">Starred</option>
              <option value="block">Block List</option>
              <option value="custom">Custom Offers</option>
            </select>
          </div>
        </div>
        {/* Result */}
        <div className="overflow-y-auto h-auto max-h-[600px]">
          <ul>
            <li className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
              <span className="w-12">
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://trickzone.top/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl1cxduy0%2Fimage%2Fupload%2Fv1692439407%2Fsimpleblog%2Fnnxtsu6erm6zaasybo9e.png&w=256&q=75"
                  alt=""
                />
              </span>
              <div className="w-full leading-5">
                <div className="flex justify-between items-center w-full">
                  <strong className="flex items-center gap-2">
                    Client Name{" "}
                    <span>
                      <BsClock />
                    </span>
                  </strong>
                  <span className="text-[13px]">25 min</span>
                  <span>
                    <BsStar />
                  </span>
                </div>
                <p className="text-[13px]">Okey, Thank you very mouch</p>
              </div>
            </li>
            <li className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
              <span className="w-12">
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://trickzone.top/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl1cxduy0%2Fimage%2Fupload%2Fv1692439407%2Fsimpleblog%2Fnnxtsu6erm6zaasybo9e.png&w=256&q=75"
                  alt=""
                />
              </span>
              <div className="w-full leading-5">
                <div className="flex justify-between items-center w-full">
                  <strong className="flex items-center gap-2">
                    Client Name{" "}
                    <span>
                      <BsClock />
                    </span>
                  </strong>
                  <span className="text-[13px]">25 min</span>
                  <span>
                    <BsStar />
                  </span>
                </div>
                <p className="text-[13px]">Okey, Thank you very mouch</p>
              </div>
            </li>
            <li className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
              <span className="w-12">
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://trickzone.top/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl1cxduy0%2Fimage%2Fupload%2Fv1692439407%2Fsimpleblog%2Fnnxtsu6erm6zaasybo9e.png&w=256&q=75"
                  alt=""
                />
              </span>
              <div className="w-full leading-5">
                <div className="flex justify-between items-center w-full">
                  <strong className="flex items-center gap-2">
                    Client Name{" "}
                    <span>
                      <BsClock />
                    </span>
                  </strong>
                  <span className="text-[13px]">25 min</span>
                  <span>
                    <BsStar />
                  </span>
                </div>
                <p className="text-[13px]">Okey, Thank you very mouch</p>
              </div>
            </li>
            <li className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
              <span className="w-12">
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://trickzone.top/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl1cxduy0%2Fimage%2Fupload%2Fv1692439407%2Fsimpleblog%2Fnnxtsu6erm6zaasybo9e.png&w=256&q=75"
                  alt=""
                />
              </span>
              <div className="w-full leading-5">
                <div className="flex justify-between items-center w-full">
                  <strong className="flex items-center gap-2">
                    Client Name{" "}
                    <span>
                      <BsClock />
                    </span>
                  </strong>
                  <span className="text-[13px]">25 min</span>
                  <span>
                    <BsStar />
                  </span>
                </div>
                <p className="text-[13px]">Okey, Thank you very mouch</p>
              </div>
            </li>
            <li className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
              <span className="w-12">
                <img
                  className="w-9 h-9 object-cover rounded-full"
                  src="https://trickzone.top/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdl1cxduy0%2Fimage%2Fupload%2Fv1692439407%2Fsimpleblog%2Fnnxtsu6erm6zaasybo9e.png&w=256&q=75"
                  alt=""
                />
              </span>
              <div className="w-full leading-5">
                <div className="flex justify-between items-center w-full">
                  <strong className="flex items-center gap-2">
                    Client Name{" "}
                    <span>
                      <BsClock />
                    </span>
                  </strong>
                  <span className="text-[13px]">25 min</span>
                  <span>
                    <BsStarFill color="#1987D4" />
                  </span>
                </div>
                <p className="text-[13px]">Okey, Thank you very mouch</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Right side */}
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
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
                Exercitationem nisi delectus minus. Minima debitis reprehenderit
                dolor earum asperiores doloremque numquam quis consectetur vel
                accusamus consequuntur deserunt explicabo nostrum, adipisci
                culpa!
              </p>
            </div>
          </div>
        </div>
        {/* send box */}
        <div className="border border-gray-500 m-2">
          <div>
            <div className="p-2 m-2">
              {/* Quick Response */}
              <div>
                <h2>Quick Response</h2>
              </div>
              <div className="flex gap-2 text-[13px] flex-wrap">
                <p value="before">Before Final</p>

                <p value="before">After Final</p>

                <p value="before">My Service</p>

                <p value="before">Chenge</p>

                <p value="before">Like TD</p>

                <p value="before">Chenge or Final</p>

                {/* Add NEw */}
                <button className="border border-gray-500 px-1 py-0 bg-white">
                  + Add New
                </button>
              </div>
            </div>
            <div className="my-2">
              <div className="w-full">
                <textarea
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
                <button className="flex w-full gap-6 items-center">
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
  );
};

export default Message;
