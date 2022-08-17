import styled from 'styled-components';

export const ThumbContainer = styled.div`
  background-color: var(--background);

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 250px;
  grid-gap: 15px;
  overflow-y: scroll;
  height: 100vh;
  padding: 20px;
`;

export const ItemContainer = styled.div`
  transform: scale(0.95);
  min-height: 250px;
`;

export const Bottom = styled.div`
  justify-content: center;
  align-items: center;
`;
