import { useState } from 'react';
import './custom.module.css';

const CustomDropdown = ({ categories,setSingleDesign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  // set Selected design to local
 

   
  return (
    <div className="dropdown-container relative bg-base-100 p-1 border border-gray-400 w-full">
      <div className="selected-option  flex w-full" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <div className='flex justify-between items-center w-full mr-6'>
            <div className='flex p-1 items-center gap-2'>
            <img className="w-12 h-12 border border-e-gray-400 object-cover" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${selectedOption?.imageIds[0]}`} alt="" />
            <span className='text-lg font-bold'>{selectedOption.name}</span>
          </div>
          <span className='text-xl'>⮟</span>
          </div>
        ) : (
          <div className='flex justify-between items-center w-full mr-6'>
          <div className='flex p-1 items-center gap-2'>
         <div className='w-12 h-12 bg-blue-300'>

         </div>
          <span className='text-lg font-bold'>Select  Design</span>
        </div>
        <span className='text-xl'>⮟</span>
        </div>
        )}
      </div>
      {isOpen && (
        <div className="options w-full absolute bg-base-100 overflow-y-auto h-64 border ">
          {categories?.length &&
          categories?.map((option, index) => (
            <div className='flex text-lg text-blue-500 font-bold border py-1 px-1 items-center gap-3' key={index} onClick={() => {
              setSelectedOption(option);
              setSingleDesign(option)
              setIsOpen(false);
            }}>
               <img className="w-12 h-12" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${option?.imageIds[0]}`} alt="" />
              <span>{option?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
