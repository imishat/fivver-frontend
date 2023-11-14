import { useEffect, useState } from "react";
import { useSendMail } from "../queries/mutation/sendMail.mutate";


function CountDown({deadline,project}) {

console.log(project,'countdown')

  const date = new Date(deadline);
 
  const deadline2 = date.setTime(date.getTime() - 6 * 60 * 60 * 1000)
// const deadline3 = deadline2.toISOString()


// Set the date we're counting down to
var countDownDate = new Date(date).getTime();

// moment(deadline).format('LLL') || "Dec 5, 2023 15:37:25"
         // Get today's date and time



// Convert the ISO date string to a Date object
let dateObj = new Date();

// Get the timestamp in milliseconds since the epoch
let timestamp = dateObj.getTime();




         // Find the distance between now and the count down date
var distance = countDownDate - timestamp;
// days
const [days,setDays] = useState('')
const [hours,setHours] = useState('')
const [minutes,setMinutes] = useState('')
const [seconds,setSeconds] = useState('')

useEffect(()=>{
  if(hours===11 && minutes===59){
    handleSendMail()
  }
},[hours,minutes])

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

const projectNumber = projectNumberFun(project?.projectNumber?.toString())

   // handle send mail
   const {mutate:sendMail} = useSendMail({style:true})

   const handleSendMail = (data) =>{
     if(user?.role!=='ADMIN'){
     const emailData = {
       "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
     "subject": `You've less then 12 hours to deliver`,
     "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>Your delivery  deadline is coming up</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>We wanted to remind you that your delivery deadline for project #MR${projectNumber}PN with ClientName123 is in less than 12 hours.<br/>
     If you still need more time to work on this project, you can ask ${project?.startedByName} to extend the delivery time.</p></div><br /><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${project?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
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
 

// Update the count down every 1 second

       setTimeout(()=>{
  // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
         setDays(days)
         setHours(hours+6)
         setMinutes(minutes)
         setSeconds(seconds)    
       },1000)  


    return (
        <>
        
        {
            distance < 0 || project?.status==='Completed' || !deadline?.length ? <div className="flex items-center">
                <p>
              {" "}
              <span className="font-bold text-xl">00</span> <span></span>
            </p>
            -
            <p>
              {" "}
              <span className="font-bold text-xl">00</span> <span></span>
            </p>
            </div> 
            :
            <div className="flex items-center gap-2">
            <p className="">
              {" "}
              <span className={`${days===0 ? 'hidden':''} font-bold text-xl`}>{days||0}d -
</span> 
            </p>
            
            <p className={` ${hours<12 && days===0  ? 'text-red-500':''}`}>
              {" "}
              <span className={`${hours===0 ? 'hidden':''} font-bold text-xl`}>{hours||0}h 
</span>
<span className={`${days!==0 ? 'hidden':''}`}>-</span>
            </p>
            
            <p className={` ${hours<12 ? 'text-red-500':''}`}>
              {" "}
              <span className={`${minutes===0 || days!==0 ? 'hidden':''} font-bold text-xl`}>{minutes||0}m 
</span>
            </p>
            
            <p className={`${hours<12 ? 'text-red-500':''}`}>
              {" "}
              <span className={`${seconds===0 || hours!==0? 'hidden':''} font-bold text-xl`}>-{seconds||0}s 
</span>
             </p> 
          </div>
        }
        </>
       
    );
}

export default CountDown;

function convertDateFormat(dateStr) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateObj = new Date(dateStr);
  const month = months[dateObj.getUTCMonth()]; // get the month name from the array using the month index
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}