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


export const Span = styled.span`
  font-size: 1em;
  font-weight: normal;
  color: var(--text);
  text-align: center;
`;

export const Progress = styled.progress`
  display: flex;
  border-radius: 5px;
  background: var(--background);
  color: var(--text);
  value: ${(props) => props.value};
`;
