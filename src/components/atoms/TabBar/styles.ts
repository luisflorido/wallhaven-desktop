import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const Title = styled.span`
  letter-spacing: 0.1em;
`;

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--menu-height);
  background-color: var(--background);
  width: 100%;
  align-items: center;

  div {
    width: 33%;
  }

  div + div {
    width: 33%;
    text-align: center;
  }

  div + div + div {
    width: 33%;
    justify-content: flex-end;
  }

  .icon {
    width: 40px;
    height: 25px;
  }

  span {
    font-weight: 500;
    color: var(--text);
    font-size: 1em;
  }

  svg {
    cursor: pointer;

    &:hover {
      background-color: var(--border);
    }
  }

  .close:hover {
    color: red !important;
  }
`;
