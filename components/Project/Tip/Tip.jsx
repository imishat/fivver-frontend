import { useSendMail } from "@/components/queries/mutation/sendMail.mutate";
import { useGetProject } from "@/components/queries/query/project.query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Tip = () => {

const router = useRouter()
  const {tipId} = router.query
  const { handleSubmit, register } = useForm();

  // tip state
  const [tipAmount,setTipAmount] = useState(0)

// get user
  const { user } = useSelector((state) => state.user);
  // get date distance
  function dateDiffInDays(date1, date2) {
    // Convert both dates to milliseconds
    let date1_ms = new Date(date1).getTime();
    let date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
  }
  const {completedId:projectId} = router.query
  const {data:singleProject} = useGetProject({projectId:tipId,search:'',status:''})
  const project = singleProject?.data?.project;


  // tip send
  const handleSendTip = ()=>{
    const tipsData = {
      type:'POST',
      data:{
        
      }
    }
  }

    // project number 
    function projectNumberFun(input) {
      const mapping = {
        1: 'A',
        2: 2,
        3: 'C',
        4: 4,
        5: 'E',
        6: 6,
        7: 'G',
        8: 8,
        9: 'i',
        0: 'Z',
      };
    
      const result = [];
    
      for (let i = 0; i < input?.length; i++) {
        const digit = input[i];
        if (mapping[digit] !== undefined) {
          result.push(mapping[digit]);
        }
      }
    
      return result.join('');
    }
  const projectNumber =  projectNumberFun(project?.projectNumber?.toString())
  
        // handle send mail
        const {mutate:sendMail} = useSendMail({style:true})
  
        const handleSendMail = () =>{
            console.log('email send')
          if(user?.role!=='ADMIN'){
          const emailData = {
            "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          "subject": `You've just been tipped!`,
          "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've just been tipped!</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>You received a tip from ${user?.fullName} for project #MR${projectNumber}PN</p></div><br /><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${project?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
          }
          sendMail(emailData,{
            onSuccess: (res) => {
              dispatch(updateState(!messageUpdate?.update))
            },
            onError: (err) => {
              showToast(err?.message);
            },
          })
        }
        }
    

  return (
    <div className="mt-6 lg:mx-20 md:flex gap-12 justify-between">
      <div className={`${tipId?'md:w-7/12':'w-full'}`}>
        <div className="pb-5 mx-4 md:mx-0">
          <h2 className="text-3xl font-bold">Thanks for your review</h2>
          <p className="py-2">
            Show your appreciation to your designer by giving a tip.
          </p>
        </div>

        <div className="flex w-full">
          {/* 5 $ Tip */}
          <button onClick={()=>setTipAmount(5)} className={`border w-full py-6 font-bold text-xl ${tipAmount===5?'bg-blue-200':''}`}>$5</button>
          {/* 10 $ Tip */}
          <button onClick={()=>setTipAmount(10)} className={`border w-full py-6 font-bold text-xl ${tipAmount===10?'bg-blue-200':''}`}>$10</button>
          {/* Custom Tip */}
          <label
            className={`border w-full md:flex px-2 text-center md:text-left justify-center md:justify-start py-6 ${tipAmount!==10 && tipAmount!==5?'bg-blue-200':''}`}
            htmlFor="custom"
          >
            <span className="text-lg font-bold">Custom Tip</span>{" "}
            <input onChange={(e)=>setTipAmount(e.target.value)}
              className="w-20 border border-gray-400 py-1 ml-3"
              type="number"
              id="custom"
            />
          </label>
        </div>
        <div className="flex justify-between items-center gap-6 my-8">
        <Link className="text-xl" href={`${tipId?`/message/project/${project?.projectId}`:'/'}`}>
        <p className="w-full text-right">No Thanks</p>
          </Link>
          
          <button onClick={()=>handleSendTip()} className="px-2 rounded py-1 bg-[#329eeb] text-white w-72 text-xl font-bold">
            Send Tip
          </button>
        </div>
      </div>
      {/* Project details */}
      <div hidden={!tipId} className="h-full md:w-80">
        <div className="bg-blue-50 p-4">
          <div>
            <h2 className="text-xl font-bold py-2">Project Details</h2>
          </div>
          <div className="flex bg-white p-1 px-2">
            <img
              src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.imageIds[0]}`}
              className="bg-rose-100 w-20 h-16 m-2"
              alt=""
            />
            <div>
              <p className="leading-5 py-1">{project?.title}</p>
              <Link className="text-blue-500 font-bold" href={"#"}>
                {project?.status}
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <ul>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project by</p>
                <strong>Client Name</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Quantity</p>
                <strong>{project?.quantity}</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Duration</p>
                <strong>
                  {dateDiffInDays(project?.createdAt, project?.deadline)} Days
                </strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Total Price</p>
                <strong>${project?.totalCost}</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project Number</p>
                <strong>#{project?.projectId}</strong>
              </li>
            </ul>
          </div>
        </div>
        {/* Back btn */}
        <div className="my-12 font-bold flex justify-center">
          <Link className="text-xl" href={`/message/project/${project?.projectId}`}>
            Back to the project page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tip;
