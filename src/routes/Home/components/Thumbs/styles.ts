import styled from 'styled-components';

export const ThumbContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 250px;
  grid-gap: 15px;
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
