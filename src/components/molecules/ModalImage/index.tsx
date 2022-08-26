import Modal from '@/components/atoms/Modal';
import Skeleton from '@/components/atoms/Skeleton';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getWallpaper, getWallpaperClean } from '@/store/ducks/wallpaper';
import { ImagePurity } from '@/types';
import React, { useEffect } from 'react';

import { InfoContainer, Info, Container, ImageContainer } from './styles';
import WallpaperContent from './WallpaperContent';

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

    return <WallpaperContent wallpaper={wallpaper} />;
  };

  return (
    <Modal isOpen={thumbId !== null} handleClose={onModalClose} noPadding>
      <Container>{renderContent()}</Container>
    </Modal>
  );
};

export default ModalImage;
