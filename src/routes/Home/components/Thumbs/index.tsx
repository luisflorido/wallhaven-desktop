import Skeleton from '@/components/atoms/Skeleton';
import ThumbImage from '@/components/molecules/ThumbImage';
import { arrayKeys } from '@/helpers';
import { useAppSelector } from '@/hooks';
import { ISearch } from '@/types';
import { forwardRef } from 'react';
import { ItemContainer, ThumbContainer } from './styles';

interface Props {
  onThumbClick: (id: string) => void;
}

const Thumbs = forwardRef<HTMLDivElement, Props>(
  ({ onThumbClick }, ref): any => {
    const { search } = useAppSelector(state => state.wallpaper);

    const handleThumbClick = (id: string) => {
      onThumbClick(id);
    };

    function paginate(arr: ISearch[], size: number): ISearch[][] {
      return arr.reduce((acc: any, val, i) => {
        const idx = Math.floor(i / size);
        const page = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
      }, []);
    }

    if (!search) {
      return arrayKeys(9).map(index => (
        <ItemContainer key={index}>
          <Skeleton height="100%" width="100%" />
        </ItemContainer>
      ));
    }

    return paginate(search, 9).map(chunk => (
      <ThumbContainer ref={ref}>
        {!chunk?.length
          ? arrayKeys(9).map(index => (
              <ItemContainer key={index}>
                <Skeleton height="100%" width="100%" />
              </ItemContainer>
            ))
          : chunk.map(thumb => (
              <ThumbImage
                key={thumb.id}
                thumb={thumb}
                onThumbClick={() => handleThumbClick(thumb.id)}
              />
            ))}
      </ThumbContainer>
    ));
  },
);

export default Thumbs;
