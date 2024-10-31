import React from 'react';
import Button from './Button';

const Form = ({
  inputDataset,
  handleChange,
  buttonDataset,
}: {
  inputDataset: FormProps[];
  handleChange?: handleChangeProp;
  buttonDataset?: ButtonProps;
}) => {
  return (
    <form className='flex flex-col gap-y-3 w-full'>
      {inputDataset.map((data, i: number) => {
        return (
          <input
            key={i}
            type={data.type}
            name={data.name}
            value={data.value}
            placeholder={data.placeholder}
            autoComplete={data.autoComplete}
            autoFocus={data.autoFocus}
            onChange={handleChange}
            required={data.required}
            readOnly={data.readOnly}
          />
        );
      })}

      {buttonDataset ? (
        <Button
          label={buttonDataset.label}
          action={buttonDataset.action}
          disabled={buttonDataset.disabled}
        />
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default Form;
