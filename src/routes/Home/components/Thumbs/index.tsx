import Skeleton from '@/components/atoms/Skeleton';
import ThumbImage from '@/components/molecules/ThumbImage';
import { arrayKeys } from '@/helpers';
import {
  useIntersectionObserver,
  useAppDispatch,
  useAppSelector,
} from '@/hooks';
import { getSearch } from '@/store/ducks/wallpaper';
import React, { useEffect, useRef } from 'react';
import { ItemContainer, ThumbContainer } from './styles';

interface Props {
  onThumbClick: (id: string) => void;
}

const Thumbs: React.FC<Props> = ({ onThumbClick }) => {
  const { search, searchMeta, loadingSearch } = useAppSelector(
    state => state.wallpaper,
  );
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleThumbClick = (id: string) => {
    onThumbClick(id);
  };

  useEffect(() => {
    if (searchMeta?.current_page === 1 && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [searchMeta]);

  const onEndReached = () => {
    if (
      search?.length &&
      !loadingSearch &&
      searchMeta &&
      searchMeta?.current_page < searchMeta?.last_page
    ) {
      dispatch(
        getSearch({
          params: { page: searchMeta.current_page + 1 },
          options: {
            addToFinal: true,
          },
        }),
      );
    }
  };

  const innerRef = useRef(null);
  useIntersectionObserver(innerRef, onEndReached, {
    threshold: 0.2,
  });

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
      {arrayKeys(3).map(index => (
        <ItemContainer ref={innerRef} key={index}>
          <Skeleton height="100%" width="100%" />
        </ItemContainer>
      ))}
    </ThumbContainer>
  );
};

export default Thumbs;
