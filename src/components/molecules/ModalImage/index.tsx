import Modal from '@/components/atoms/Modal';
import Skeleton from '@/components/atoms/Skeleton';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getWallpaper, getWallpaperClean } from '@/store/ducks/wallpaper';
import { ImagePurity } from '@/types';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import {
  BsFillFileEarmarkImageFill,
  BsFillEyeFill,
  BsHeartFill,
  BsTagsFill,
  BsFillEyeSlashFill,
  BsFillPersonLinesFill,
  BsReverseLayoutTextSidebarReverse,
} from 'react-icons/bs';
import {
  InfoContainer,
  Info,
  InfoTitle,
  InfoDescription,
  CreatorContainer,
  CreatorImage,
  Description,
  FullImage,
  Container,
  ImageContainer,
  Tag,
  TagsContainer,
  ResolutionTitle,
  InfoTitleContainer,
  CreatorUploadDate,
  CreatorName,
} from './styles';

export interface IDescription {
  purity?: ImagePurity;
}

interface Props {
  thumbId: string | null;
  onModalClose: () => void;
}

const ModalImage: React.FC<Props> = ({ thumbId, onModalClose }) => {
  const dispatch = useAppDispatch();
  const { wallpaper, loadingWallpaper } = useAppSelector(
    state => state.wallpaper,
  );

  useEffect(() => {
    if (thumbId) {
      dispatch(getWallpaper(thumbId));
    } else if (!thumbId && wallpaper) {
      dispatch(getWallpaperClean());
    }
  }, [thumbId]);

  const renderContent = () => {
    if (loadingWallpaper || !wallpaper) {
      return (
        <Container>
          <ImageContainer>
            <Skeleton />
          </ImageContainer>
          <InfoContainer>
            <Info>
              <Skeleton height={40} />
            </Info>
            <Info>
              <Skeleton height={100} />
            </Info>
            <Info>
              <Skeleton height={100} />
            </Info>
          </InfoContainer>
        </Container>
      );
    }

    return (
      <Container>
        <ImageContainer>
          <FullImage src={wallpaper.path} alt={`Image ${wallpaper.id}`} />
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

  return (
    <Modal isOpen={thumbId !== null} handleClose={onModalClose} noPadding>
      <Container>{renderContent()}</Container>
    </Modal>
  );
};

export default ModalImage;
