import React from 'react';
import { ButtonContainer } from './styles';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
};

export default Button;
