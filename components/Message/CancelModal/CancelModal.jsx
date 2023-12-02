import { useCreateNotifications } from "@/components/queries/mutation/notifications.mutation";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import { useSocketChat } from "@/hooks/useSocketChat";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function CancelModal({ project, reply, userInfo, setReply }) {

  const { sendMessage, returnMessage } = useSocketChat()
  // get user 
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const messageUpdate = useSelector((state) => state.update)

  const { showToast, Toast } = useToast()
  // cancel value
  const [cancelValue, setCancelValue] = useState('')



  // handle send cancel project
  const handleSendCancelation = () => {
    const sendLike = {
      type: "cancel",
      content: cancelValue,
      projectId: project?.projectId,
      reply: reply,
      messageType: "unread",
      userId: userInfo?.userId,
      receiverId: userInfo?.userId,
      userName: userInfo?.fullName,
    };
    // send
    sendMessage(sendLike);
    dispatch(updateState(!messageUpdate?.update));
    handleCreateNotifications()
    setReply({});
    showToast("Cancelation Send", "success");
    setCancelValue('')
  };


  const isForAdmin = user?.role === 'ADMIN' ? false : true
  // create notification
  const { mutate: createNotification } = useCreateNotifications()
  // handle create notifications
  const handleCreateNotifications = () => {
    const notificationData = {
      "type": "project",
      "model": "cancel",
      "message": cancelValue,
      "image": { fileId: project?.featuredImageId || project?.imageIds[0] },
      "isForAdmin": isForAdmin,
      "isRead": false,
      "userId": project?.startedBy,
      "projectId": project?.projectId
    }
    createNotification(notificationData, {
      onSuccess: (res) => {
        console.log(res.data);
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
      },
    })
  }


  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <Toast />
      <dialog id="cancel_modal" className="modal ">
        <div className="modal-box rounded-none p-0 min-w-[60%]">
          <div className="bg-blue-50 px-4 py-2 flex items-center justify-between">
            <h3 className="font-bold text-lg">Cancel This Project</h3>
            <form method="dialog" className="">
              <button><IoCloseCircle size={23} /></button>
            </form>

          </div>
          <div>
            {/* Textarea */}
            <textarea onChange={(e) => setCancelValue(e.target.value)} placeholder="Enter the reason for cancellation" className="textarea focus-within:outline-none rounded-none border-none textarea-bordered  w-full"></textarea>
            <div className="flex py-2 items-center justify-end px-12">

              {/* Button */}
              <div>
                <button onClick={() => handleSendCancelation()} className="bg-[#1881cc] font-bold hover:bg-blue-700 text-white py-2 px-6 text-center">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CancelModal;