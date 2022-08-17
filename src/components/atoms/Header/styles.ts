import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  svg {
    color: white;
    cursor: pointer;
  }
`;

export const Title = styled.span`
  font-size: 1.4em;
  font-weight: bold;
  color: var(--text);
  text-align: center;
`;
