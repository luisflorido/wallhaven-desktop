import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';

import { reactotronConfigure } from '@/config/ReactotronConfig';
import storage from 'redux-persist/lib/storage';
import rootSagas from './sagas';
import rootReducers from './ducks';

const isDev = process.env.NODE_ENV === 'development';

reactotronConfigure();
const sagaMonitor = isDev ? console.tron.createSagaMonitor() : null;

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [];
middlewares.push(sagaMiddleware);

const composer = isDev
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, composer);

sagaMiddleware.run(rootSagas);

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
