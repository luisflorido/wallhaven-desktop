import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  height: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
`;

export const Progress = styled.progress`
  display: flex;
  border-radius: 10px;
  color: #65a443;
  width: ${props => props.value}%;
`;
