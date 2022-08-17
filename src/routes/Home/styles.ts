import styled from 'styled-components';
import { IFlex } from '.';

export const Container = styled.div`
  display: flex;
  flex: 1;
  max-height: 100vh;
`;

export const Flex = styled.div<IFlex>`
  flex: ${props => props.flex || 1};
`;
