import Skeleton from '@/components/atoms/Skeleton';
import ThumbImage from '@/components/molecules/ThumbImage';
import { arrayKeys } from '@/helpers';
import { useAppSelector } from '@/hooks';
import React, { useEffect, useRef } from 'react';
import { ItemContainer, ThumbContainer } from './styles';

interface Props {
  onThumbClick: (id: string) => void;
}

const Thumbs: React.FC<Props> = ({ onThumbClick }) => {
  const { search, searchMeta } = useAppSelector(state => state.wallpaper);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleThumbClick = (id: string) => {
    onThumbClick(id);
  };

  useEffect(() => {
    if (searchMeta?.current_page === 1 && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [searchMeta]);

  return (
    <ThumbContainer ref={scrollRef}>
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
};

export default Thumbs;
