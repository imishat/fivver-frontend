import { useCreateNotifications } from "@/components/queries/mutation/notifications.mutation";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import { useSocketChat } from "@/hooks/useSocketChat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function AdditionalOffer({ project, reply, setReply, update, setUpdate }) {
  const { message, setMessage, sendMessage, returnMessage } = useSocketChat();

  const [days, setDays] = useState(1);

  const dispatch = useDispatch()

  // get user 
  const { user } = useSelector(state => state.user)

  const messageUpdate = useSelector(state => state.update)

  // react hook form
  const { handleSubmit, register, reset } = useForm();

  const handleDaysChange = (event) => {
    const newDays = parseInt(event.target.value); // Parse the input value as an integer
    if (!isNaN(newDays)) {
      setDays(newDays);
    } else {
      setDays(); // Set a default value if input is not a valid number
    }
  };

  let amount = days * 5;

  // toast
  const { Toast, showToast } = useToast();
  /// send message
  const handleExtendDelivery = (data) => {
    const messageData = {
      type: "additional",
      ...data,
      amount: data?.amount,
      userId: project?.startedBy,
      receiverId: project?.startedBy,
      reply,
      projectId: project?.projectId,
    };
    
    //  send
    sendMessage(messageData);
    dispatch(updateState(!messageUpdate?.update))
    setReply({});
    showToast("Offer Send", "success");
    handleCreateNotifications(data)

    // reset()
  };
  const isForAdmin = user?.role === 'ADMIN' ? false : true
  // create notification
  const { mutate: createNotification } = useCreateNotifications()
  // handle create notifications
  const handleCreateNotifications = (data) => {
    const notificationData = {
      "type": "project",
      "model": "additional",
      "message": data?.message,
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
      <dialog id="additional_modal" className="modal ">
        <div className="modal-box rounded-none p-0 min-w-[60%]">
          <div className="bg-blue-50 px-4 py-2 flex items-center justify-between">
            <h3 className="font-bold text-lg">Additional Offer</h3>
            <form method="dialog" className="">
              <button onClick={() => setDays(1)}>
                <IoCloseCircle size={23} />
              </button>
            </form>
          </div>
          <form onSubmit={handleSubmit(handleExtendDelivery)}>
            {/* Textarea */}
            <textarea
              {...register("message", { required: true })}
              placeholder="Typing"
              className="textarea focus-within:outline-none rounded-none border-none textarea-bordered  w-full"
            ></textarea>
            <div className="flex items-center sm:justify-between flex-col sm:flex-row py-2 px-12">
              {/* Input  */}
              <div className="flex flex-row-reverse py-2 items-center md:justify-between w-full gap-2 sm:w-1/2">
                <div className="flex items-center gap-4">
                  <label htmlFor="days">Days</label>
                  <input
                    {...register("days",{required:true})}
                    onChange={handleDaysChange}
                    className="input font-bold pl-6 text-lg input-bordered rounded-none w-20 input-sm"
                    type="text"
                    id="days"
                  />
                </div>
                <div className="flex  items-center gap-4">
                  <label htmlFor="amount">Amount</label>
                  <div className="flex items-center gap-1 text-lg relative font-bold">
                    <input
                     {...register("amount",{required:true})}
                      className="input text-lg input-bordered pl-6 rounded-none w-20 input-sm"
                      type="text"
                      id="amount"
                       // Make the input field read-only to prevent user input
                    />
                  </div>
                </div>
              </div>
              {/* Button */}
              <div>
                <button className="bg-[#1881cc]  font-bold hover:bg-blue-700 text-white py-2 px-6 text-center sm:px-4 sm:py-2">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default AdditionalOffer;
