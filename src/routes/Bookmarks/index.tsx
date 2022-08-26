import Header from '@/components/atoms/Header';
import ModalImage from '@/components/molecules/ModalImage';
import React, { useState } from 'react';
import { Container } from './styles';
import Thumbs from './Thumbs';

const Bookmarks: React.FC = () => {
  const [openThumb, setOpenThumb] = useState<string | null>(null);

  const handleModalClose = () => {
    setOpenThumb(null);
  };

  const handleThumbClick = (thumbId: string) => {
    setOpenThumb(thumbId);
  };

  return (
    <Container>
      <Header title="Bookmarks" />
      <Thumbs isBookmark onThumbClick={handleThumbClick} />
      <ModalImage thumbId={openThumb} onModalClose={handleModalClose} />
    </Container>
  );
};

export default Bookmarks;
