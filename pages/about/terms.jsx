import Main from "@/Layout/Main";
import Link from "next/link";
import { useState } from "react";

const Terms = () => {
  let [trams,setTrams] = useState(true)
  let [refan,setRefan] = useState(false)
  let handleTrams =()=>{
    setTrams(true)
    setRefan(false)
  }
  let handleRefund =()=>{
   setRefan(true)
   setTrams(false)
  }

   
   
   
  return (
    <Main title={"Privacy Policy"}>
    <div className='max-w-7xl mx-auto mt-5'>
      <div className='flex gap-x-32   relative after:absolute after:h-[1px] after:w-[520px] after:rounded-full after:bg-black/40 after:bottom-[-10px] after:left-0 after:contents-[``]'>
        <h2 onClick={handleTrams} className={`font-dm text-2xl cursor-pointer font-bold  ${trams ?"text-blue-400 border-b border-solid border-blue-600/25" : "text-[#111111]" }`}>Terms & Conditions</h2>
        <h2 onClick={handleRefund} className={`font-dm text-2xl cursor-pointer font-bold gap-x-32 ${refan ?"text-blue-400 border-b border-solid border-blue-600/25" : "text-[#111111]" }`}>Refund Policy</h2>
      </div>
    {
      trams &&
      <div>
        <h2 className="font-dm mt-16  text-xl font-medium text-blue-500 ">Terms & Conditions</h2>
        <div className='pl-5'>
          
          <ul className='relative after:absolute mt-8 mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>To contact us or purchase any of our designs you must first create anaccount. You can create an account for FREE. You must keep your accountemail/username password secure.Refund Policy</li>
          </ul>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
             <li className='font-dm text-[#444444] font-normal text-base'>We require customers to pay in advance to purchase any design or start aproject for any design.</li>
          </ul>

          <ul className='relative after:absolute mb-5  after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'> We have a few options to start the project, You can start the project throughny option:</li>
          </ul>

      

          <ul className='list-decimal pl-2 mb-8'>
            <li className='font-dm text-[#444444] mb-1 font-normal text-base'>You can start by clicking "Project" from the top bar or footer.</li>
            <li className='font-dm text-[#444444] mb-1 font-normal text-base'>You can start by clicking "Start Project Here" from the Price List page.</li>
            <li className='font-dm text-[#444444] mb-1 font-normal text-base'>You can first collect your favorite designs in the cart list then you can start the project for your favorite designs from the cart list.</li>
            <li className='font-dm text-[#444444] mb-1 font-normal text-base'>You can start the project through a custom offer from the inbox.</li>
          </ul>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>The requirements page must be completed when starting a customer project, as we will create the customer's design according to these requirements.</li>
          </ul>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>You will need to provide us with your specific information so that we can create your design.</li>
          </ul>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>How we will work on the project:</li>
          </ul>

          <div className='px-2 mt-4'>
              <h4 className='font-dm font-bold text-[#111111] text-lg'>Start Work</h4> 
              <p className='font-dm text-[#444444] font-normal text-base mb-5'>After completing the customer requirement page we will start the design work.</p>
              
              <h4 className='font-dm font-bold text-[#111111] text-lg'>First Concept</h4> 
              <p className='font-dm text-[#444444] font-normal mb-5 text-base'>The customer gives us the time to create his design, we will create it and show it to him within that time. (Then, if the customer feels the need to change something in this design, then we will correct the changes if the customer informs us about the changes.)</p>
            
              <h4 className='font-dm font-bold text-[#111111] text-lg'>Final Dalevary</h4> 
              <p className='font-dm text-[#444444] font-normal text-base mb-5'>After the design work is completed we will deliver the final file according to the package selected by the customer.</p>
              
          </div>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>The customer must make all changes/revisions before we send the final file, no changes/revisions will be accepted after we send the final file.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>If there are any errors on our part after sending the final file, we will only correct those errors. If there is an error on the art of the customer, the customer must start a new project to correct the error.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>We don't give the customer two options to choose from when creating a new design. We only provide one design option. If the customer doesn't like the first design, we will create a second design for the customer. But we will delete the first design while creating the second design. If the customer decides to accept the first design after seeing the second design. Then the customer will not get the first design from us. We won't create the first design a second time. So if the customer likes the first design, it should be accepted immediately.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>You can only use our designs for your personal or business purposes.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>You can't resell our designs.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>We don't provide any Images. You must provide us with images to use in your design.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>We will only create the design. We do not print any designs. You have to get your design printed from another print shop.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>If you like one of our designs, and you want to start a project for this design, please take a look at the design description before starting the project.</li>
          </ul>

    
          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>No complaints will be accepted after project completion. You cannot cancel the project without any reason. Refund Policy</li>
          </ul>

    
      

    
        </div>
      </div>
    }
    {
      refan &&
      <div>
      <h2 className="mt-16 font-dm text-xl font-medium text-blue-500  ">Refund Policy</h2>
        <div className=' pl-5'>
          
          <ul className='relative after:absolute mb-5 mt-8 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>If you accidentally start a project, you must notify us within 5 hours of starting the project. We will be happy to refund you.</li>
          </ul>

          <ul className='relative after:absolute mb-5 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>If you don't like the design we created, you should let us know before we send the final file. We will gladly refund you. However, refunds will not be accepted after we have sent the final file.</li>
          </ul>

          <ul className='relative after:absolute mb-8 after:h-2 after:w-2 after:top-[7px] after:left-[-20px] after:bg-blue-400 after:rounded-full'>
            <li className='font-dm text-[#444444] font-normal text-base'>After you start a project, we will not provide additional services to you if you ask us for additional services beyond the package of the project. You will not be eligible for a refund based on this issue.</li>
          </ul>
        </div>

      </div>
    }


    </div>
  </Main>   
  )     
};

export default Terms;
