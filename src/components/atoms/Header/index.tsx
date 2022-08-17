import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Container, Title } from './styles';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <BsChevronLeft onClick={() => handleBack()} size={26} />
      <Title>{title}</Title>
      <div />
    </Container>
  );
};

export default Header;
