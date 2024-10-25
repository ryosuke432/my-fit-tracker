import React from 'react';

const Button: React.FC<ButtonProps> = ({ label, action, disabled }) => {
  return (
    <>
      {disabled ? (
        <button
          type='button'
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
          onClick={action}
          disabled
        >
          {label}
        </button>
      ) : (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={action}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
