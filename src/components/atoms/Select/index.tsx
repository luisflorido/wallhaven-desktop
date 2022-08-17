import React from 'react';

import { SelectContainer } from './styles';

export interface SelectOption {
  value: string;
  label: string;
}
interface Props {
  options: SelectOption[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

const Select: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & Props
> = ({ options, onChange, defaultValue, ...rest }) => (
  <SelectContainer
    {...rest}
    defaultValue={defaultValue}
    onChange={event => onChange(event.target.value)}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </SelectContainer>
);

export default Select;
