import React from 'react';
import { AiOutlineClose, AiOutlineLine } from 'react-icons/ai';

import { Container, Bar } from './styles';

const TabBar: React.FC = () => {
  const isDarwin = window.Main.platform === 'darwin';
  const handleClose = () => {
    window.Main.close();
  };

  const handleMinimize = () => {
    window.Main.minimize();
  };

  return (
    <Container>
      <Bar className="drag">
        <div />
        <div>
          <span>WALLHAVEN</span>
        </div>
        {!isDarwin ? (
          <div className="flex no-drag">
            <AiOutlineLine
              className="icon"
              onClick={handleMinimize}
              color="var(--border)"
              size={20}
            />
            <AiOutlineClose
              className="icon close"
              onClick={handleClose}
              color="var(--border)"
              size={20}
            />
          </div>
        ) : (
          <div className="flex" />
        )}
      </Bar>
    </Container>
  );
};

export default TabBar;
