import DownloadProgressBar from '@/components/atoms/DownloadProgressBar';
import { useAppDispatch, useAppSelector, useProgressiveImg } from '@/hooks';
import { toggleBookmark } from '@/store/ducks/bookmark';
import { ISearch } from '@/types';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillBookmarkFill, BsFillStarFill } from 'react-icons/bs';
import { Containter, Icons, Image } from './styles';

export interface Props {
  thumb: ISearch;
  onThumbClick: (id: string) => void;
  isBookmark?: boolean;
}

interface DownloadProgressEvent {
  id: string;
  progress: number;
}

interface DownloadCompletedEvent {
  id: string;
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
    const [downloadingProgress, setDownloadingProgress] = useState(0);

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

    useEffect(() => {
      window.Main.on(
        'bookmark-download-progress',
        (data: DownloadProgressEvent) => {
          if (data.id === thumb.id) {
            console.log(`Progress ${data.id} ${data.progress}%`);
            setDownloadingProgress(data.progress === 0 ? 1 : data.progress);
          }
        },
      );

      window.Main.on('bookmark-downloaded', (data: DownloadCompletedEvent) => {
        if (data.id === thumb.id) {
          console.log(`Downloaded ${data.id}`);
          setDownloadingProgress(0);
        }
      });
    }, [thumb.id]);

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
            opacity: downloadingProgress > 0 ? 0.5 : 1.0,
          }}
        />
        <DownloadProgressBar progress={downloadingProgress} />
        {renderDownloadIcon}
      </Containter>
    );
  },
);

export default ThumbImage;
