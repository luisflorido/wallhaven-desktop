import { useAppDispatch, useAppSelector, useProgressiveImg } from '@/hooks';
import { toggleBookmark } from '@/store/ducks/bookmark';
import { ISearch } from '@/types';
import { forwardRef, useMemo } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillBookmarkFill, BsFillStarFill } from 'react-icons/bs';
import { Containter, Icons, Image } from './styles';

export interface Props {
  thumb: ISearch;
  onThumbClick: (id: string) => void;
  isBookmark?: boolean;
}

const ThumbImage = forwardRef<HTMLDivElement, Props>(
  ({ thumb, onThumbClick, isBookmark = false }, ref) => {
    const [src, blur] = useProgressiveImg(
      thumb.thumbs.small,
      thumb.thumbs.original,
    );
    const bookmarks = useAppSelector(state => state.bookmark.bookmarks);
    const isBookmarked = bookmarks?.length
      ? bookmarks.some(bookMark => bookMark.id === thumb.id)
      : false;
    const dispatch = useAppDispatch();

    const handleBookmarkClick = () => {
      dispatch(toggleBookmark(thumb));
    };

    const renderDownloadIcon = useMemo(() => {
      if (!isBookmark) {
        return null;
      }
      const icon = thumb.downloaded ? (
        <AiOutlineCheckCircle className="downloadIcon success" />
      ) : (
        <AiOutlineClockCircle className="downloadIcon" />
      );
      return icon;
    }, [isBookmark, thumb.downloaded]);

    return (
      <Containter
        ref={ref}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}>
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
        {renderDownloadIcon}
      </Containter>
    );
  },
);

export default ThumbImage;
