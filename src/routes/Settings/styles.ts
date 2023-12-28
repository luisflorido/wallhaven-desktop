import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: var(--text);
  background-color: var(--background);

  h1,
  p {
    margin-bottom: 0.5rem;
  }
`;

export const Content = styled.div`
  padding: 1% 4%;
  background-color: var(--background-secondary);
  flex: 1;
`;

export const Configuration = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 0.9em;
`;

export const Flex = styled.div`
  flex: 1;
`;

export const TokenLinkBtn = styled.button.attrs({ type: 'button' })`
  background: transparent;
  color: white;
  text-decoration: underline;
  margin-left: 10px;
  cursor: pointer;
`;
