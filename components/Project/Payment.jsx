import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateManyProject } from "../queries/mutation/manyProject.mutation";
import { useSendMail } from "../queries/mutation/sendMail.mutate";
import { useGetSubCategoryById } from "../queries/query/getSubcategory.query";
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
                handleSendMail()
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

    // get sub category data by id
    const {data:subData} = useGetSubCategoryById({subcategoryId:projectData[0]?.subcategoryId})
    const subCategoryInfo = subData?.data?.subcategory
  
        // handle send mail
        const {mutate:sendMail} = useSendMail({style:true})

        const handleSendMail = () =>{
        //   if(user?.role!=='ADMIN'){
          const emailData = {
            "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          "subject": `You've receive a project from ${user?.fullName}`,
          "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You've receive a project from ${user?.fullName}</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>Project:${projectNumber}</p></div><br /><table border='1' style='border-collapse:collapse;width:100%'><tr><th width='230'>Item</th><th>QTY</th><th>DUR</th><th>Price</th></tr><tr><td style='padding:8px'>${projectData[0]?.title} <br/><small>${subCategoryInfo?.name}</small></td><td align='center'>${projectData[0]?.quantity}</td><td align='center'>${projectData[0]?.isExtraFastDeliveryEnabled?1:2} days</td><td align='center'>$${subCategoryInfo?.price*projectData[0]?.quantity}</td></tr><tr><td style='padding:8px; border:none'><p style='padding:0;margin:0'><svg stroke="currentColor" fill="#1a8ce2" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg> Unlimited revision</p><p style='padding:0;margin:0'><svg stroke="currentColor" fill="#1a8ce2" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg> PSD Source File</p><p style='padding:0;margin:0'><svg stroke="currentColor" fill="#1a8ce2" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg> Print ready PDF or JPEG</p></td></tr><tr style='border:1px solid'><td style='border:0;padding:8px'>Extra-fast 1 day delivery</td><td></td><td style='border:0;padding:8px'></td><td align='center' style='border:0;padding:8px;'>$${projectData[0]?.isExtraFastDeliveryEnabled ? 10:0}</td></tr><tr style='border:1px solid'><th style='border:0;padding:0px'>Total</td><td></td><td style='border:0;padding:0px'></th><th align='center' style='border:0;padding:8px;'>$${projectData[0]?.totalCost}</th></tr></table><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${projectData[0]?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; margin-top:22px; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
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
    console.log('firstProject',projectData[0])
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