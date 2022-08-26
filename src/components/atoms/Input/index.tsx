import React from 'react';
import { InputContainer } from './styles';

export interface Props {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & Props> = ({
  name,
  onChange,
  fullWidth = false,
  ...rest
}) => {
  return (
    <InputContainer
      fullWidth={fullWidth}
      name={name}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
