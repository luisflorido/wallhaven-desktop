import { all, fork } from 'redux-saga/effects';
import wallpaperSaga from './wallpaper';
import bookmarkSaga from './bookmark';
import settingSaga from './setting';

export default function* rootSagas() {
  yield all([fork(wallpaperSaga), fork(bookmarkSaga), fork(settingSaga)]);
}
