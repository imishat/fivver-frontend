import moment from "moment";
import { useSelector } from "react-redux";
import { useGetUserData } from "../queries/query/getUserProfile.query";

function MessageCard({message}) {
      // get user 
const {user} = useSelector(state => state.user)

// get user by id
const {data:userData} = useGetUserData({token:'',userId:message?.userId})
const userInfo = userData?.data?.user
    return (
        <div className="flex w-full px-2 gap-2 py-3">
        <div className="w-9">
          <img
            className="w-8 h-8 rounded-full border border-gray-500"
            src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${
                message?.userId === user?.userId ? user?.profilePicture:userInfo?.profilePicture}`} 
            alt=""
          />
        </div>
        <div className="w-full">
          <strong>
            {message?.userId === user?.userId ? 'Me':userInfo?.fullName}{" "}
            <span className="text-xs font-normal">
              {/* Apr 22, 2023, 7:33 PM */}
              {moment(message?.createdAt).calendar()}
            </span>
          </strong>
        <div className="relative">
            <a href={`#${message?.reply?.id}`} className="p-1 px-3 bg-base-200 top-0 z-0 text-xs relative rounded-full">{message?.reply?.reply}</a>
        <p id={message?.messageId} className={`text-sm bg-base-100 z-50 ${message?.reply? 'mt-0':''}`}>
           {message?.content}
          </p>
        </div>
        </div>
      </div>
    );
}

export default MessageCard;