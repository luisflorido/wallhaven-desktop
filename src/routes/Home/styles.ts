import styled from 'styled-components';
import { IFlex } from '.';

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - var(--menu-height));

  .thumbs-container {
    overflow-y: auto;
    background-color: var(--background);
  }

  .skeleton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
  }
`;

export const Flex = styled.div<IFlex>`
  flex: ${props => props.flex || 1};
`;
