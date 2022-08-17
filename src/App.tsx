import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import { store, persistor } from './store';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';
import TabBar from './components/atoms/TabBar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <HashRouter>
        <TabBar>
          <Routes />
        </TabBar>
      </HashRouter>
      <ToastContainer />
    </PersistGate>
  </Provider>
);

export default App;
