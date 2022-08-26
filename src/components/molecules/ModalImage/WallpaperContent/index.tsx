import { useProgressiveImg } from '@/hooks';
import { IWallpaper } from '@/types';
import dayjs from 'dayjs';
import React from 'react';
import {
  BsFillPersonLinesFill,
  BsFillEyeSlashFill,
  BsReverseLayoutTextSidebarReverse,
  BsFillFileEarmarkImageFill,
  BsFillEyeFill,
  BsHeartFill,
  BsTagsFill,
} from 'react-icons/bs';
import {
  Container,
  ImageContainer,
  FullImage,
  InfoContainer,
  ResolutionTitle,
  Info,
  InfoTitleContainer,
  InfoTitle,
  InfoDescription,
  CreatorContainer,
  CreatorImage,
  CreatorName,
  CreatorUploadDate,
  Description,
  TagsContainer,
  Tag,
} from '../styles';

interface Props {
  wallpaper: IWallpaper;
}

const WallpaperContent: React.FC<Props> = ({ wallpaper }) => {
  const [src] = useProgressiveImg(wallpaper.thumbs.large, wallpaper.path);

  return (
    <Container>
      <ImageContainer>
        <FullImage src={src} alt={`Image ${wallpaper.id}`} />
      </ImageContainer>
      <InfoContainer>
        <ResolutionTitle>
          {wallpaper.dimension_x}x{wallpaper.dimension_y}
        </ResolutionTitle>
        <Info>
          <InfoTitleContainer>
            <BsFillPersonLinesFill color="var(--icon)" />
            <InfoTitle>Creator</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <CreatorContainer>
              <CreatorImage
                src={wallpaper.uploader.avatar['32px']}
                alt="Creator icon"
              />
              <div>
                <CreatorName uploader={wallpaper.uploader}>
                  {wallpaper.uploader.username}
                </CreatorName>
                <CreatorUploadDate>
                  {dayjs
                    .tz(wallpaper.created_at, 'America/Scoresbysund')
                    .fromNow()}
                </CreatorUploadDate>
              </div>
            </CreatorContainer>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsFillEyeSlashFill color="var(--icon)" />
            <InfoTitle>Purity</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <Description purity={wallpaper.purity}>
              {wallpaper.purity}
            </Description>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsReverseLayoutTextSidebarReverse color="var(--icon)" />
            <InfoTitle>Category</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <Description>{wallpaper.category.toUpperCase()}</Description>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsFillFileEarmarkImageFill color="var(--icon)" />
            <InfoTitle>Size</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <Description>
              {(wallpaper.file_size / 1024 / 1024).toFixed(2)}MB
            </Description>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsFillEyeFill color="var(--icon)" />
            <InfoTitle>Views</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <Description>{wallpaper.views}</Description>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsHeartFill color="var(--icon)" />
            <InfoTitle>Favorites</InfoTitle>
          </InfoTitleContainer>
          <InfoDescription>
            <Description>{wallpaper.favorites}</Description>
          </InfoDescription>
        </Info>
        <Info>
          <InfoTitleContainer>
            <BsTagsFill color="var(--icon)" />
            <InfoTitle>Tags</InfoTitle>
          </InfoTitleContainer>
          <TagsContainer>
            {wallpaper.tags.map(tag => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </TagsContainer>
        </Info>
      </InfoContainer>
    </Container>
  );
};

export default WallpaperContent;
