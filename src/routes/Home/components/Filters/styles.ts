import { ImagePurity } from '@/types';
import styled from 'styled-components';
import { IFilterName } from '.';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--background);
  height: 100%;
  justify-content: space-between;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;

  .row {
    flex-direction: row;
  }
  .align-center {
    align-items: center;
  }
`;

export const BottomContainer = styled.div`
  flex-direction: column;
  display: flex;
  padding: 8px;
`;

export const Separator = styled.div`
  border-bottom: 1px solid var(--border);
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5em;
  padding: 20px 15px 15px 15px;
  color: var(--text);
`;

export const FilterTitle = styled.h2`
  font-weight: 500;
  font-size: 1em;
  padding: 5px 15px 0px 15px;
  margin-bottom: 10px;
  line-height: 1em;
  color: var(--text);
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;

  .icon-button {
    margin: 0 5px;
    cursor: pointer;
  }
`;

export const parseBorder = (purity: ImagePurity | undefined) => {
  switch (purity) {
    case 'sfw':
      return 'var(--sfw)';
    case 'nsfw':
      return 'var(--nsfw)';
    case 'sketchy':
      return 'var(--sketchy)';
    default:
      return 'var(--background-terciary)';
  }
};

export const FilterName = styled.span<
  Pick<IFilterName, 'isActive' | 'purity'> & { active?: boolean }
>`
  cursor: pointer;
  color: var(--text);
  padding: 12px 15px;
  font-size: 0.8em;
  line-height: 10px;
  font-weight: 400;
  border-left: 8px solid transparent;
  border-radius: 4px;
  margin: 2px 5px;

  &:hover {
    background-color: #212121aa;
  }

  ${props =>
    props.active && {
      borderLeft: `8px solid ${parseBorder(props.purity)}`,
      backgroundColor: 'var(--background-terciary)',
    }}/* &:hover {
    border-left: 8px solid
      ${props => {
    switch (props.purity) {
      case 'sfw':
        return 'var(--sfw)';
      case 'nsfw':
        return 'var(--nsfw)';
      case 'sketchy':
        return 'var(--sketchy)';
      default:
        return 'var(--background-terciary)';
    }
  }};
    background-color: var(--background-terciary);
  } */
`;

export const ScreenName = styled.span`
  display: flex;
  font-size: 1.1em;
  font-weight: 100;
  color: var(--text);
  align-items: center;
  background-color: var(--background);
  padding: 6px 8px;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;
