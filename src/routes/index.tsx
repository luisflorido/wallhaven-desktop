import { showToast } from '@/helpers';
import { useAppDispatch } from '@/hooks';
import { checkDownloadedBookmarks } from '@/store/ducks/bookmark';
import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Bookmarks from './Bookmarks';
import Home from './Home';
import Settings from './Settings';

const Routes: React.FC = () => {
  const history = useHistory();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.Main.on('toast-error', (errorMessage: string) =>
      showToast({
        message: errorMessage,
        type: 'error',
      }),
    );
    if (!localStorage.getItem('api-key')) {
      timeoutRef.current = setTimeout(() => {
        showToast({
          message: 'You need to set up your settings.',
          type: 'info',
        });
        history.push('/settings');
      }, 500);
    }
    dispatch(checkDownloadedBookmarks());
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/settings" component={Settings} />
      <Route path="/bookmarks" component={Bookmarks} />
    </>
  );
};

export default Routes;
