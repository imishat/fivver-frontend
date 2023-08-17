import { useState } from 'react';
import './style.module.css';

const ImageDropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="dropdown-container border w-full">
      <div className="selected-option !flex w-full" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <>
            <img className='w-12 h-12' src={selectedOption.image} alt={selectedOption.label} />
            <span className='text-2xl font-bold'>{selectedOption.label}</span>
          </>
        ) : (
          'Select an option...'
        )}
      </div>
      {isOpen && (
        <div className="options w-full  border ">
          {options.map((option, index) => (
            <div key={index} onClick={() => {
              setSelectedOption(option);
              setIsOpen(false);
            }}>
              <img className='w-12 h-12' src={option.image} alt={option.label} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
