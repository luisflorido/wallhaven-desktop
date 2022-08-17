import { useAppDispatch, useAppSelector, useProgressiveImg } from '@/hooks';
import { toggleBookmark } from '@/store/ducks/bookmark';
import { ISearch } from '@/types';
import { forwardRef } from 'react';
import { BsFillBookmarkFill, BsFillStarFill } from 'react-icons/bs';
import { Containter, Icons, Image } from './styles';

export interface Props {
  thumb: ISearch;
  onThumbClick: (id: string) => void;
}

const ThumbImage = forwardRef<HTMLDivElement, Props>(
  ({ thumb, onThumbClick }, ref) => {
    const [src, blur] = useProgressiveImg(
      thumb.thumbs.small,
      thumb.thumbs.large,
    );
    const bookmarks = useAppSelector(state => state.bookmark.bookmarks);
    const isBookmarked = bookmarks?.length
      ? bookmarks.some(bookMark => bookMark.id === thumb.id)
      : false;
    const dispatch = useAppDispatch();

    const handleBookmarkClick = () => {
      dispatch(toggleBookmark(thumb));
    };

    return (
      <Containter ref={ref}>
        <Icons>
          <div>
            <span>{thumb.favorites}</span>
            <BsFillStarFill color="orange" size={18} />
          </div>
          <div>
            <span>
              {thumb.dimension_x}x{thumb.dimension_y}
            </span>
          </div>
          <div>
            {/* <BsFillHeartFill
              color="white"
              size={20}
              onClick={handleHeartClick}
            /> */}
            <BsFillBookmarkFill
              color={isBookmarked ? 'orange' : 'white'}
              size={20}
              onClick={handleBookmarkClick}
            />
          </div>
        </Icons>
        <Image
          purity={thumb.purity}
          src={src}
          alt={`Image ${thumb.id}`}
          onClick={() => onThumbClick(thumb.id)}
          style={{
            filter: blur ? 'blur(20px)' : 'none',
            transition: blur ? 'none' : 'filter 0.3s ease-out',
          }}
        />
      </Containter>
    );
  },
);

export default ThumbImage;
