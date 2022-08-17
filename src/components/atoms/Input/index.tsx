import React from 'react';
import { InputContainer } from './styles';

interface Props {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & Props> = ({
  name,
  onChange,
  ...rest
}) => {
  return <InputContainer name={name} onChange={onChange} {...rest} />;
};

export default Input;
