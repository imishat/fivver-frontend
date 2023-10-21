import { useState } from 'react';
import './style.module.css';

const ImageDropdown = ({ selectedDesign,setSingleDesign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  // set Selected design to local
 
console.log(selectedDesign)
   
  return (
    <div className="dropdown-container border w-full">
      <div className="selected-option flex w-full" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <div className='flex justify-between items-center w-full mr-6'>
            <div className='flex p-1 items-center gap-2'>
            <img className="w-12 h-12" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${selectedOption?.featuredImageId ? selectedOption?.featuredImageId : selectedOption?.imageIds[0]}`} alt="" />
            <span className='text-lg font-bold'>{selectedOption.title}</span>
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
        <div className="options w-full  border ">
          {selectedDesign?.length &&
          selectedDesign?.map((option, index) => (
            <div className='flex text-lg text-blue-500 font-bold border py-1 px-1 items-center gap-3' key={index} onClick={() => {
              setSelectedOption(option);
              setSingleDesign(option)
              setIsOpen(false);
            }}>
               <img className="w-12 h-12" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${option?.featuredImageId ? option?.featuredImageId : option?.imageIds[0]}`} alt="" />
              <span>{option?.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
