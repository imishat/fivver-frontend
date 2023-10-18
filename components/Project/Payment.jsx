import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateManyProject } from "../queries/mutation/manyProject.mutation";
import PaymentProjectCard from "./PaymentProjectCard";

const Payment = () => {
// router
const router = useRouter()
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
                console.log(res)
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