import React, { useState, useEffect } from 'react';

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const Toast = () => {
    if (!toast) return null;

    const { message, type } = toast;

    const toastClasses = `fixed text-2xl top-[85px] right-0 m-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`;

    return (
      <div className={toastClasses}>
        <p className=''>{message}</p>
      </div>
    );
  };

  return { showToast, Toast };
};

export default useToast;
