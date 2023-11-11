import Link from "next/link"

const Design =()=>{

    return(
        <>
        <div>
        
        <div className=" flex justify-center text-center py-4">
          <div className="md:text-2xl font-semibold">
            
            <p className="text-black">You select the company/service and design of your choice.
. </p>
            <p className="text-black">And see your selected items below.</p>
          </div>
        </div>
      </div>
      {/* comnany */}
         <div>
         <div className="my-6">
            {/* Design card */}
            <ul className='flex sm:px-8 gap-2 flex-wrap'>
                <li><Link href={'/designs/Solar'} className='bg-rose-200 text-black px-3 rounded-full'>Solar</Link></li>
                <li><Link href={'/designs/Pressure Washing'} className='bg-rose-200 text-black px-3 rounded-full'>Pressure Washing</Link></li>
                <li><Link href={'/designs/Real Estate'} className='bg-rose-200 text-black px-3 rounded-full'>Real Estate</Link></li>
                <li><Link href={'/designs/Lawn Care'} className='bg-rose-200 text-black px-3 rounded-full'>Lawn Care</Link></li>
                <li><Link href={'/designs/Moving'} className='bg-rose-200 text-black px-3 rounded-full'>Moving</Link></li>
                <li><Link href={'/designs/Cleaning Services'} className='bg-rose-200 text-black px-3 rounded-full'>Cleaning Services</Link></li>
                <li><Link href={'/designs/Others'} className='bg-rose-200 text-black px-3 rounded-full'>Others</Link></li>
            </ul>
        </div>
    </div>
    <div className="border-b-2 border-blue-400 "/>
    {/* catagory */}
    <div className="border-b-2 border-blue-500 ">
            <div className="my-6">
                {/* Design card */}
                <ul className='flex sm:px-8 gap-2 flex-wrap'>
                    <li><Link href={'/designs/Buisness Card'} className='bg-blue-300 text-black px-3 rounded-full'>Buisness Card</Link></li>
                    <li><Link href={'/designs/Door Hanger'} className='bg-blue-300 text-black px-3 rounded-full'>Door Hanger</Link></li>
                    <li><Link href={'/designs/Flyer'} className='bg-blue-300 text-black px-3 rounded-full'>Flyer</Link></li>
                    <li><Link href={'/designs/Postcard'} className='bg-blue-300 text-black px-3 rounded-full'>Postcard</Link></li>
                    <li><Link href={'/designs/Brochure'} className='bg-blue-300 text-black px-3 rounded-full'>Brochure</Link></li>
                    <li><Link href={'/designs/Billboard'} className='bg-blue-300 text-black px-3 rounded-full'>Billboard</Link></li>
                    <li><Link href={'/designs/Yard Sign'} className='bg-blue-300 text-black px-3 rounded-full'>Yard Sign</Link></li>
                    <li><Link href={'/designs/Orders'} className='bg-blue-300 text-black px-3 rounded-full'>Orders</Link></li>
                    <li><Link href={'/designs/Orders'} className='bg-blue-300 text-black px-3 rounded-full'>Orders</Link></li>
                </ul>
            </div>
        </div>
    </>
    )

    
}
export default Design