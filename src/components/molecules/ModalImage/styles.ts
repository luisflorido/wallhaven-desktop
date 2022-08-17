import { IWallpaper } from '@/types';
import styled from 'styled-components';
import { IDescription } from '.';

export const Container = styled.div`
  display: flex;
  flex: 1;
`;
export const ImageContainer = styled.div`
  flex: 8;
`;
export const FullImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const InfoContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  border-left: 2px solid var(--border);
`;

export const ResolutionTitle = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: underline;
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.1);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: center;
`;
export const Info = styled.div`
  justify-content: space-between;
  padding: 10px 15px;
`;
export const InfoTitleContainer = styled.div`
  align-items: center;
  display: flex;
`;
export const InfoTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-left: 5px;
`;
export const InfoDescription = styled.div`
  font-size: 0.9rem;
  font-weight: 100;
  margin-top: 5px;
`;

export const CreatorContainer = styled.div`
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    span {
      padding: 0 10px;
    }
  }
`;
export const CreatorImage = styled.img`
  border-radius: 3px;
`;
export const CreatorName = styled.span<Pick<IWallpaper, 'uploader'>>`
  font-weight: 700;
  font-size: 0.8rem;
  align-self: flex-start;

  color: ${props => {
    const { group } = props.uploader;
    switch (group) {
      case 'Owner/Developer':
        return 'var(--owner)';
      case 'Administrator':
        return 'var(--administrator)';
      case 'Developer':
        return 'var(--developer)';
      case 'Moderator':
        return 'var(--moderator)';
      case 'Senior Moderator':
        return 'var(--moderator)';
      default:
        return 'var(--user)';
    }
  }};
`;
export const CreatorUploadDate = styled.span`
  font-weight: 100;
  font-size: 0.7em;
`;

export const Description = styled.span<IDescription>`
  font-weight: ${props => props.purity && '700'};
  color: ${props => {
    switch (props.purity) {
      case 'sfw':
        return 'var(--sfw)';
      case 'nsfw':
        return 'var(--nsfw)';
      case 'sketchy':
        return 'var(--sketchy)';
      default:
        return 'var(--text)';
    }
  }};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const Tag = styled.span`
  padding: 5px 7px;
  background-color: var(--text-secondary);
  border-radius: 10px;
  font-size: 0.75rem;
  margin: 0 8px 5px 0;
  color: var(--text);
`;
