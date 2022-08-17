/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

declare global {
  interface Console {
    tron: any;
  }
}

export const reactotronConfigure = () => {
  if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure()
      .configure({
        host: 'localhost',
      })
      .use(reactotronRedux())
      .use(sagaPlugin({ except: [''] }))
      .connect();

    console.tron = tron;

    if (tron?.clear) {
      tron.clear();
    }
  }
};
