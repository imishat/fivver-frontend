import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCheckCircleFill, BsReply } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAction } from "../queries/mutation/delete.mutation";
import { useCreateNotifications } from "../queries/mutation/notifications.mutation";
import { useSendMail } from "../queries/mutation/sendMail.mutate";
import { useUpdateMessage } from "../queries/mutation/updateMessage.mutation";
import { useUpdateProject } from "../queries/mutation/updateProject.mutation";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";

function OfferMessageCard({ message, setReply, project }) {

  const router = useRouter()
  const { projectId } = router?.query
  console.log(message, "message")
  const dispatch = useDispatch()
  // get update with redux
  const messageUpdate = useSelector((state) => state.update);

  const { mutate: deleteMessage, isLoading } = useDeleteAction()
  // get user 
  const { user } = useSelector(state => state.user)

  // Toast 
  const { Toast, showToast } = useToast()




  const handleWithdraw = (id) => {
    const deleteData = {
      id: id,
      type: 'messages'
    }
    deleteMessage(deleteData, {
      onSuccess: (res) => {
        console.log(res);
        showToast("Withdraw Offer", "success");
        dispatch(updateState(!messageUpdate?.update))
      },
      onError: (err) => {
        showToast(err?.message);
      },
    })
  }

  // update project
  const { mutate: updateProject } = useUpdateProject()
  const { mutate: updateMessage } = useUpdateMessage()

  // deadline get 
  const nowUTC = new Date();

  const hoursToAdd = 24 * parseInt(message?.delivered);

  // Add 6 hours
  nowUTC.setUTCHours((nowUTC.getUTCHours() * hoursToAdd));
  const deadline = nowUTC?.toISOString();

  // update project
  const handleUpdateProject = (id) => {
    const projectData = {
      id: id,
      status: 'Progress',
      track: 1,
      title: message?.categoryName,
      categoryId: project?.categoryId,
      subcategoryId: project?.subcategoryId,
      deadline: deadline,
      totalCost: message?.price,
      imageIds: [message?.imageId, ...project?.imageIds]
    }
    updateProject(projectData, {
      onSuccess: (res) => {
        console.log(res)
        dispatch(updateState(!messageUpdate?.update))
        router.reload()
      },
      onError: (err) => {
        console.error(err);
      }
    })
  }


  // handle accept custom offer
  const handleCustomOfferAccept = (id) => {
    const messageData = {
      id: id,
      action: 'accept'
    }
    updateMessage(messageData, {
      onSuccess: (res) => {
        showToast(`Offer Accepted'`, "success");
        handleSendMail()
        handleUpdateProject(projectId)
        dispatch(updateState(!messageUpdate?.update))
        handleCreateNotifications('accept')
      },
      onError: (err) => {
        showToast(err?.message);
      }
    })
  }

  /// handle send mail to admin
  // handle send mail
  const { mutate: sendMail } = useSendMail({ style: true })
  console.log(message, 'project')
  const handleSendMail = () => {
    console.log('email send')
    // if(user?.role!=='ADMIN'){
    const emailData = {
      "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      "subject": `Good News: Your offer has been accepted`,
      "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've receive a project from ${user?.fullName}</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>${user?.fullName} has accepted your on ${project?.projectNumber ? "project " + project?.projectNumber : 'Message'}</p></div><br /><table border='1' style='border-collapse:collapse;width:100%'><tr><th width='230'>Item</th><th>DUR</th><th>Price</th></tr><tr><td style='padding:8px'>${message?.categoryName} <br/><small>${message?.selectSubCategory}</small></td><td align='center'>${message?.delivered} days</td><td align='center'>$${message?.price}</td></tr><tr style='border:1px solid'><th style='border:0;padding:0px;text-align:left;padding-left:7px'>Total</td><td style='border:0;padding:0px'></th><th align='center' style='border:0;padding:8px;'>$${message?.price}</th></tr></table><div style='margin: 0px 0 33px 0'>${project?.projectId ? `<a href='${process.env.NEXT_PUBLIC_URL}/message/project/${project?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; margin-top:22px; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a>` : `<a href='${process.env.NEXT_PUBLIC_URL}/message/${user?.userId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; margin-top:22px; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a>`}</div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
    }
    sendMail(emailData, {
      onSuccess: (res) => {
        console.log(res);
        showToast(`Email Send`, "success");
        dispatch(updateState(!messageUpdate?.update))
      },
      onError: (err) => {
        showToast(err?.message);
      },
    })
    // }
  }


  // handle reject custom offer
  const handleCustomOfferReject = (id) => {
    const messageData = {
      id: id,
      action: 'cancelled'
    }
    updateMessage(messageData, {
      onSuccess: (res) => {
        showToast(`Offer Cancel' }`, "success");
        handleUpdateProject(projectId)
        dispatch(updateState(!messageUpdate?.update))
        handleCreateNotifications('cancelled')
      },
      onError: (err) => {
        showToast(err?.message);
      }
    })
  }

  const isForAdmin = user?.role === 'ADMIN' ? false : true
  // create notification
  const { mutate: createNotification } = useCreateNotifications()
  // handle create notifications
  const handleCreateNotifications = (data) => {
    const notificationData = {
      "type": "project",
      "model": "custom",
      "message": data,
      "image": { fileId: project?.featuredImageId || project?.imageIds[0] },
      "isForAdmin": isForAdmin,
      "userId": project?.startedBy,
      "isRead": false,
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
    <div className="flex w-full px-2  gap-2 py-3">
      <Toast />
      <div className="w-9">
        <img
          className="w-8 h-8 rounded-full border border-gray-500"
          src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.sender?.profilePicture}`}
          alt=""
        />
      </div>
      <div className="w-full">
        <strong>
          {/* (message?.userId===user.userId ? 'Me':userInfo?.fullName) */}
          <Link href={`/user/${message?.sender?.senderId}`}> {
            (message?.sender?.userId === user?.userId ? 'Me' : message?.sender?.fullName)
          }</Link>

          <span className="text-xs pl-2 font-normal">
            {/* Apr 22, 2023, 7:33 PM */}
            {moment(message?.createdAt).calendar()}
          </span>
        </strong>
        <div className="relative">
          {
            message?.reply?.messageId ? <a href={`#${message?.message?.reply?.messageId}`} className="p-1 px-3 bg-base-200 top-0 z-0 text-xs relative rounded-full">{message?.reply?.reply?.slice(0, 55)} <span>{message?.message?.reply?.reply?.length > 55 ? '...' : ''}</span>  </a> : ''
          }

          <div className="max-w-md bg-blue-50 h-full">
            {/* Offer image */}
            <div className="flex bg-blue-200 items-center justify-between p-3">
              <Image height={100} width={100} className="w-14 object-cover h-14 border p-1 border-gray-400" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${message?.imageId}`} alt="" />
              {/* Offer title */}
              <h2 className="text-xl font-bold">{message?.categoryName}</h2>
              {/* Offer Price */}
              <p className="text-3xl font-bold text-blue-500">${message?.price}</p>
            </div>
            {/* Offer Body */}
            <div>
              <p className="p-3">{message?.message}</p>
              <ul className="mt-6 mx-3">
                <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.delivered} Day Delivery</li>
                <li className="font-bold flex items-center gap-1"><BsCheckCircleFill className="text-blue-500" /> {message?.selectSubCategory}</li>
              </ul>
            </div>
            {/* Offer Button */}
            <div className=" w-full mt-4">
              {
                user?.role === 'ADMIN' ?
                  <>{

                    message?.action === 'accept' || message?.action === 'cancelled' ? '' :
                      <button onClick={() => handleWithdraw(message?.messageId)} className={`w-full bg-[#1881cc] text-white font-bold py-2  ${isLoading && 'animate-pulse'}`}>Withdraw Offer </button>
                  }
                    {
                      message?.action === 'accept' && <div className="w-full flex justify-center px-5 pb-3">
                        <button o className="bg-[#1881cc] text-white px-5 font-bold py-2">Accepted</button>
                      </div>
                    }
                    {
                      message?.action === 'cancelled' &&
                      <div className="flex justify-center w-full">
                        <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancelled</button>
                      </div>
                    }
                  </>
                  :
                  <>
                    {
                      message?.action === 'accept' && <div className="w-full flex justify-center px-5 pb-3">
                        <button o className="bg-[#1881cc] text-white px-5 font-bold py-2">Accepted</button>
                      </div>
                    }
                    {
                      message?.action === 'cancelled' &&
                      <div className="flex justify-center w-full">
                        <button className="bg-gray-400 text-white px-5 font-bold py-2">Cancelled</button>
                      </div>
                    }
                    {
                      message?.action === 'accept' || message?.action === 'cancelled' ? '' :
                        <div className="w-full flex justify-between px-5 pb-3">
                          <button onClick={() => handleCustomOfferReject(message?.messageId)} className="bg-gray-400 text-white px-5 font-bold py-2">Cancel</button>
                          <button onClick={() => handleCustomOfferAccept(message?.messageId)} className="bg-[#1881cc] text-white px-5 font-bold py-2">Accept</button>
                        </div>
                    }


                  </>
              }

            </div>
          </div>
          <p id={message?.messageId} className={`text-sm bg-base-100  flex items-center gap-2 ${message?.reply ? 'mt-0' : ''}`}>
            {/* {message?.message} */}
            <span className="cursor-pointer p-1" onClick={() => setReply({ reply: message?.message, messageId: message?.messageId })}><BsReply /></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfferMessageCard;