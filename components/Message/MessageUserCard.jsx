import Link from "next/link";
import { BsClock, BsStar } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetUserData } from "../queries/query/getUserProfile.query";

function MessageUserCard({message}) {
            // get user 
const {user} = useSelector(state => state.user)
     // get user by id
  const { data: userData } = useGetUserData({ token: "", userId: message?.userId });
  // user info
  const userInfo = userData?.data?.user;
  console.log(message)
    return (
       <Link className={``} href={`/message/${message?.userId}`}>
        <li key={message?.messageId} className="flex items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
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
              {userInfo?.fullName}
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
      </Link>
    );
}

export default MessageUserCard;