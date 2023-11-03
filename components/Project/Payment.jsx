import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateManyProject } from "../queries/mutation/manyProject.mutation";
import { useSendMail } from "../queries/mutation/sendMail.mutate";
import { useGetProject } from "../queries/query/project.query";
import PaymentProjectCard from "./PaymentProjectCard";

const Payment = () => {
// router
const router = useRouter()

const {data:allProjects} = useGetProject({status:'',search:'',projectId:'',page:'',limit:''})
console.log(allProjects)
  // project create loading
  const [projectLoading, setProjectLoading] = useState(false);
// Create Project 
const {mutate:sendProjectData} = useCreateManyProject()
    // get project data from localstorage
    const [projectData,setProjectData] = useState([])

    useEffect(()=>{
       setProjectData(JSON.parse(typeof window!== 'undefined' && localStorage.getItem('projectData')))
    },[router])
    const totalPrice = projectData?.length && projectData?.reduce((prev,current) =>  prev + current.totalCost, 0);

    // handle payment
    const handlePayment = () =>{
        setProjectLoading(true)
        sendProjectData( {"projects":projectData}, {
            onSuccess: (res) => {
            //   showToast(res.message, "success");
            handleSetProjectInLocal(res?.data)
              const savedProject = projectData?.length>1 ? res?.data?.projects:res?.data?.projects
              if(savedProject || savedProject?.length){
                typeof window !== "undefined" && window.localStorage.setItem('savedProjects',JSON.stringify(savedProject))
                router.push('/project/requirement/')
              }
              // loading stop
              setProjectLoading(false);
              // reset();
            },
            onError: (err) => {
            //   showToast(err?.response?.data?.message);
              // loading stop
              setProjectLoading(false);
            },
          });
        
    }

    // project number
    const projectNumber = ''

        // handle send mail
        const {mutate:sendMail} = useSendMail({style:true})

        const handleSendMail = (data) =>{
        //   if(user?.role!=='ADMIN'){
          const emailData = {
            "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          "subject": `You've receive a project from ${user?.fullName}`,
          "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've receive a project from ${user?.fullName}</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>Project:${projectNumber}</p></div><br /><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${projectData[0]?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
          }
          sendMail(emailData,{
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


const handleSetProjectInLocal = (data) =>{
    const firstProject = projectData?.length === 1 ?  data?.project : data?.projects
    console.log(firstProject)
    typeof window !== 'undefined' && localStorage.setItem('projectRequirement',JSON.stringify(projectData[0]))
}
    return (
        <div className="md:w-[70%] mx-auto">
            <div>
                <div className="my-12">
                    <h2 className="text-2xl text-center font-semibold">Add your card details carefully</h2>
                </div>
               <div className="border mb-12">
                {/* Header */}
                {
                    projectData?.map((project,i)=><PaymentProjectCard key={i} project={project} />)
                }
           
                {/* Body */}
                <div className="p-6 bg-blue-50">
                    <div>
                        <div className="flex items-center gap-2">
                        <h3 className="text-xl my-2 font-bold">Card Payment</h3>
                            <div>
                                <img className="w-24" src="https://www.kindpng.com/picc/m/399-3995736_credit-card-payment-options-visa-mastercard-discover-logos.png" alt="" />
                            </div>
                        </div>
                        <p>Your credit card information is secure, and your card is not charged until after you've confirmed your order. Adding a new card?</p>
                    </div>
                    {/* Inputs */}
                    <div>
                        {/* card details */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="details">Card Details</label>
                            <select className="px-4 py-2 bg-white border border-gray-300" id="details">
                                <option value="add-new-card">Add new card</option>
                            </select>
                        </div>
                        {/* name on card */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="card-name">Card Details</label>
                            <input placeholder="Card Details" className="px-4 py-2 border border-gray-300" type="text" id="card-name" />
                        </div>
                        {/* card number */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="card-number">Card Number</label>
                            <input placeholder="Card Number" className="px-4 py-2 border border-gray-300" type="text" id="card-number" />
                        </div>
                        {/* Expire */}
                        <div className="md:flex items-center overflow-hidden justify-between gap-4">
                        <div className="flex flex-col lg:w-[60%] my-6">
                            <label htmlFor="expire-date">Expiry Date</label>
                            <input placeholder="MM/YY" className="px-4 py-2 border border-gray-300" type="text" id="expire-date" />
                        </div>
                        <div className="flex flex-col my-6">
                            <label htmlFor="cvv">CVV</label>
                            <input placeholder="CVV" className="px-4 py-2 border border-gray-300" type="text" id="cvv" />
                        </div>
                        </div>
                        {/* save */}
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="save" className="checkbox checkbox-info rounded-none checkbox-sm" />
                            <label htmlFor="save">Save this card information</label>
                        </div>
                        {/* Order info */}
                        <div className="sm:flex justify-between bg-white my-4 gap-12 p-4 border">
                            <div className="sm:w-1/2 space-y-3">
                               
                                <ul className="flex border-b pb-3 border-gray-300 justify-between items-center">
                                    <li>Fee</li>
                                    <li className="font-bold">$00</li>
                                </ul>
                                <ul className="flex justify-between items-center">
                                    <li>Total</li>
                                    <li className="font-bold">${totalPrice}</li>
                                </ul>
                            </div>
                            <div className="sm:w-1/2 flex items-center justify-center">
                                <div className="w-full text-center">
                                <p className="py-4">Single Payment</p>
                                <button onClick={()=>handlePayment()} className="px-4 py-4 bg-[#2692DD] w-full text-white text-2xl rounded-lg">{projectLoading ? 'Loading...' :'Pay Now'}</button>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div  className="flex justify-center">
                            <p className="py-2">Go to the Project Requirement option by clicking on "Pay Now"</p>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Payment;