import ModalImage from '@/components/molecules/ModalImage';
import { showToast } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getSearch, getSearchClear } from '@/store/ducks/wallpaper';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Filters from './components/Filters';
import Thumbs from './components/Thumbs';
import { Container, Flex } from './styles';

export interface IFlex {
  flex?: number;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lastSearch, searchError } = useAppSelector(state => state.wallpaper);
  const { settings } = useAppSelector(state => state.setting);
  const [openThumb, setOpenThumb] = useState<string | null>(null);
  const history = useHistory();

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

  useEffect(() => {
    if (
      !lastSearch ||
      dayjs()
        .subtract(settings.minutesToRefresh, 'minutes')
        .isAfter(dayjs(lastSearch))
    ) {
      dispatch(getSearch({}));
    }
  }, []);

  const handleModalClose = () => {
    setOpenThumb(null);
  };

  const handleThumbClick = (thumbId: string) => {
    setOpenThumb(thumbId);
  };

  return (
    <Container>
      <Flex flex={2}>
        <Filters />
      </Flex>
      <Flex flex={8}>
        <Thumbs onThumbClick={handleThumbClick} />
      </Flex>
      <ModalImage thumbId={openThumb} onModalClose={handleModalClose} />
    </Container>
  );
};

export default Home;
