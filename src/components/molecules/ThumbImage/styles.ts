import { ISearch } from '@/types';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Containter = styled(motion.div)`
  position: relative;
  height: 100%;
  break-inside: avoid;

  &:hover :first-child {
    opacity: 1;
  }

  .downloadIcon {
    position: absolute;
    bottom: 10px;
    left: 10px;
    margin: 5px 10px;
    color: var(--not-downloaded);
    font-size: 1.2em;
  }

  .success {
    color: var(--downloaded) !important;
  }
`;

export const Image = styled.img<Pick<ISearch, 'purity'>>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid
    ${props => {
      if (props.purity === 'nsfw') {
        return 'var(--nsfw)';
      }
      if (props.purity === 'sketchy') {
        return 'var(--sketchy)';
      }
      return 'transparent';
    }};
  transition: border 0.2s;

  cursor: pointer;

  &:hover {
    border: 0;
  }
`;

export const Icons = styled.div`
  transition: opacity 0.2s ease-out;
  opacity: 0;
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  padding: 10px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin: 0 5px;
      cursor: pointer;
    }
  }

  span {
    font-weight: 100;
    font-size: 0.8em;
    text-align: center;
    color: var(--text);
  }
`;
