function Configer() {
   return (
      <div>
         <section className='px-4 lg:px-0 mt-5'>
            {/* <Container> */}
            <h2 className='font-roboto mb-8 font-bold text-3xl text-[#444444]'>Affiliate</h2>

            <div className='border border-solid border-[#666666] p-8'>
               <h2 className='font-roboto mb-8 font-bold text-3xl text-[#444444]'>Payment Settings</h2>
               <div className='mb-5'>
                  <label className='font-roboto text-base font-medium text-[#111111] mr-14'>Paypal Email </label>
                  <input type="text" className='border border-solid border-[#666666] py-4 px-5 w-10/12' />
               </div>
               <div>
                  <label className='font-roboto text-base font-medium text-[#111111] mr-4'>Bank Informations </label>
                  <input type="text" className='border border-solid border-[#666666] py-4 px-5 w-10/12' />
               </div>
               <div className='flex justify-end pr-14'>
                  <button className=' border-blue-500 bg-[#1881cc] mt-8 py-4 px-16 font-roboto text-white text-lg font-medium'>Update Payment Settings</button>
               </div>
            </div>
            {/* </Container> */}
         </section>
      </div>
   )
}

export default Configer