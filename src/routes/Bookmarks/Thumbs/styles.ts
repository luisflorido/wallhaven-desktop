import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--background);
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  background-color: var(--background-secondary);
  justify-content: center;

  .title {
    margin-top: 30px;
    color: var(--text);
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
  }
`;

export const ThumbContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-auto-rows: 350px;
  grid-gap: 15px;
  padding: 20px;
  overflow-y: scroll;
`;

export const ItemContainer = styled.div`
  transform: scale(0.95);
  min-height: 350px;
`;

export const Bottom = styled.div`
  justify-content: center;
  align-items: center;
`;
