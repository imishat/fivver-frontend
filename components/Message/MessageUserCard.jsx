import Link from "next/link";
import { useState } from "react";
import { BsClock, BsStar, BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useUpdateUser } from "../queries/mutation/updateUser.mutation";
import { useGetUserData } from "../queries/query/getUserProfile.query";
import useToast from "../utility/useToast";

function MessageUserCard({message,update,setUpdate}) {
            // get user 
const {user} = useSelector(state => state.user)


     // get user by id
  const { data: userData } = useGetUserData({ token: "", userId: message?.userId,update:update });
  // user info
  const userInfo = userData?.data?.user;

  // toast 
  const {Toast,showToast} = useToast()

  // loading
  const [loading,setLoading] = useState(false)
  // update user
  const {mutate:updateUser} = useUpdateUser()
  // handle star
  const handleStar = () =>{
    setLoading(true)
    const action={
      star:!userInfo?.star,
      action:'aaaa',
    }
    updateUser(action,{
      onSuccess: (res) => {
        console.log(res);
        showToast(`${!userInfo?.star ? 'Star Added':'Star Removed' }`, "success");
        setLoading(false)
        setUpdate(!update)
      },
      onError: (err) => {
        setLoading(false)
        showToast(err?.message);
      },
    })  
  }
    return (
     
      <div className={`${message?.sender?.senderId === user?.userId ? 'hidden':''} flex items-center w-full relative  `} >
        <Link className="w-full" href={`/message/${message?.receiver?.receiverId}`}>
        <Toast />
        <li key={message?.messageId} className="flex pr-9 items-center w-full bg-[#F2F9FF] py-4 border-b border-gray-400 cursor-pointer px-3 gap-2">
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
              {message?.sender?.fullName}
              <span>
                <BsClock />
              </span>
            </strong>
            <span className="text-[13px]">25 min</span>
          
          </div>
          <p className="text-[13px]">Okey, Thank you very mouch</p>
        </div>
      </li>
      </Link>
       {/* Handle Star */}
       <span className={`cursor-pointer absolute right-0 hover:bg-base-300 rounded-full px-1 py-2 flex items-center justify-center w-8 ${loading?'animate-pulse':''}`} onClick={()=>handleStar()}>
             
             {
              userInfo?.star ? <BsStarFill />:<BsStar />
             } 
            </span>
      </div>
    );
}

export default MessageUserCard;