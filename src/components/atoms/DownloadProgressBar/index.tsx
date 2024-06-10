import React from 'react';
import { Container, Progress } from './styles';

interface Props {
  progress: number;
}

const DownloadProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <Container>
      <Progress value={progress} />
    </Container>
  );
};

export default DownloadProgressBar;
