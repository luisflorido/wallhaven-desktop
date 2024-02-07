import Skeleton from '@/components/atoms/Skeleton';
import ModalImage from '@/components/molecules/ModalImage';
import { showToast } from '@/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useIntersectionObserver,
} from '@/hooks';
import { getSearch, getSearchClear } from '@/store/ducks/wallpaper';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Filters from './components/Filters';
import Thumbs from './components/Thumbs';
import { Container, Flex } from './styles';

export interface IFlex {
  flex?: number;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lastSearch, searchError, search, searchMeta, loadingSearch } =
    useAppSelector(state => state.wallpaper);
  const { settings } = useAppSelector(state => state.setting);
  const [openThumb, setOpenThumb] = useState<string | null>(null);
  const history = useHistory();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchError?.status === 401) {
      showToast({
        message: 'Your API token is invalid.',
        type: 'error',
      });
      history.push('/settings');
      dispatch(getSearchClear());
    }
  }, [searchError]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (
      !lastSearch ||
      dayjs()
        .subtract(settings.minutesToRefresh, 'minutes')
        .isAfter(dayjs(lastSearch))
    ) {
      dispatch(getSearch({}));
    }
    scrollToTop();
  }, []);

  const handleModalClose = () => {
    setOpenThumb(null);
  };

  const handleThumbClick = (thumbId: string) => {
    setOpenThumb(thumbId);
  };

  const hasNextPage = searchMeta
    ? searchMeta?.current_page < searchMeta?.last_page
    : false;

  const onEndReached = () => {
    if (search?.length && !loadingSearch && searchMeta && hasNextPage) {
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
    <Container>
      <Flex flex={2}>
        <Filters scrollToTop={scrollToTop} />
      </Flex>
      <Flex flex={8} className="thumbs-container" ref={scrollRef}>
        <Thumbs onThumbClick={handleThumbClick} />
        {(hasNextPage || loadingSearch) && (
          <Flex flex={1} className="skeleton">
            <Skeleton height={50} width={50} borderRadius={50} />
          </Flex>
        )}
        <div ref={innerRef} style={{ height: 1 }} />
      </Flex>
      <ModalImage thumbId={openThumb} onModalClose={handleModalClose} />
    </Container>
  );
};

export default Home;
