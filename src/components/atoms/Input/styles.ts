import styled from 'styled-components';
import { Props } from '.';

export const InputContainer = styled.input<Props>`
  background-color: var(--background);
  padding: 10px;
  border-radius: 4px;
  margin: 5px 10px;
  color: var(--text);

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;
