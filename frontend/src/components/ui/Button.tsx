import React from 'react';

const Button: React.FC<ButtonProps> = ({ label, action, disabled }) => {
  return (
    <>
      {disabled ? (
        <button
          type='button'
          className={`bg-emerald-500 text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed`}
          onClick={action}
          disabled
        >
          {label}
        </button>
      ) : (
        <button
          type='button'
          className={`bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full`}
          onClick={action}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
