import React from 'react';

// FROM https://benhoneywill.com/progressive-image-loading-with-react-hooks/

export const useProgressiveImg = (
  lowQualitySrc: string,
  highQualitySrc: string,
): [string, boolean] => {
  const [src, setSrc] = React.useState(lowQualitySrc);

  React.useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, src === lowQualitySrc];
};
