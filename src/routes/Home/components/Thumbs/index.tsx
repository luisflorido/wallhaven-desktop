import Skeleton from '@/components/atoms/Skeleton';
import ThumbImage from '@/components/molecules/ThumbImage';
import { arrayKeys } from '@/helpers';
import { useAppSelector } from '@/hooks';
import React, { forwardRef } from 'react';
import { ItemContainer, ThumbContainer } from './styles';

interface Props {
  onThumbClick: (id: string) => void;
}

const Thumbs = forwardRef<HTMLDivElement, Props>(({ onThumbClick }, ref) => {
  const { search } = useAppSelector(state => state.wallpaper);

  const handleThumbClick = (id: string) => {
    onThumbClick(id);
  };

  return (
    <ThumbContainer ref={ref}>
      {!search?.length
        ? arrayKeys(9).map(index => (
            <ItemContainer key={index}>
              <Skeleton height="100%" width="100%" />
            </ItemContainer>
          ))
        : search.map(thumb => (
            <ThumbImage
              key={thumb.id}
              thumb={thumb}
              onThumbClick={() => handleThumbClick(thumb.id)}
            />
          ))}
    </ThumbContainer>
  );
});

export default Thumbs;
