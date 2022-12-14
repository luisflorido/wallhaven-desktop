import ThumbImage from '@/components/molecules/ThumbImage';
import { useAppSelector } from '@/hooks';
import React, { useRef } from 'react';
import { Container, Content, ThumbContainer } from './styles';

interface Props {
  onThumbClick: (id: string) => void;
  isBookmark?: boolean;
}

const Thumbs: React.FC<Props> = ({ onThumbClick, isBookmark = false }) => {
  const { bookmarks } = useAppSelector(state => state.bookmark);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleThumbClick = (id: string) => {
    onThumbClick(id);
  };

  return (
    <Container>
      <Content>
        {bookmarks.length ? (
          <ThumbContainer ref={scrollRef}>
            {bookmarks.map(thumb => (
              <ThumbImage
                isBookmark={isBookmark}
                key={thumb.id}
                thumb={thumb}
                onThumbClick={() => handleThumbClick(thumb.id)}
              />
            ))}
          </ThumbContainer>
        ) : (
          <span className="title">Nothing to show.</span>
        )}
      </Content>
    </Container>
  );
};

export default Thumbs;
