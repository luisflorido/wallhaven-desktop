import React from 'react';
import { Container, Span, Progress } from './styles';

const DownloadProgressBar: React.FC = ({ value, status }: Props
) => {

    return (
        <Container>
            <Span><Progress>{status}: {value}</Progress></Span>
        </Container>
    );
};

interface Props {
    value: number;
    status: string;
}

export default DownloadProgressBar;