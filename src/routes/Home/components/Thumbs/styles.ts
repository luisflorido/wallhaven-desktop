import styled from 'styled-components';

export const ThumbContainer = styled.div`
  width: 100%;
  padding: 20px 15px;
  columns: 3;
  column-gap: 10px;

  @media (max-width: 900px) {
    columns: 2;
  }

  @media (max-width: 480px) {
    columns: 1;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  transform: scale(0.95);
  min-height: 250px;
`;

export const Bottom = styled.div`
  justify-content: center;
  align-items: center;
`;
