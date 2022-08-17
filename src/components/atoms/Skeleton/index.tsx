import React from 'react';
import SkeletonComponent, { SkeletonProps } from 'react-loading-skeleton';

interface Props {
  flex?: boolean;
}

const Skeleton: React.FC<Props & SkeletonProps> = ({ flex, ...rest }) => {
  return (
    <SkeletonComponent
      baseColor="#202020"
      highlightColor="#444"
      containerClassName={flex ? 'flex-1' : ''}
      style={{ height: '100%' }}
      {...rest}
    />
  );
};

export default Skeleton;
