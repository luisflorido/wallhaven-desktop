import { ISearch, Payload } from '@/types';
import { fork, takeLatest, all, select } from 'redux-saga/effects';
import settings from '@/store/ducks/setting';
import bookmarks, { toggleBookmark } from '@/store/ducks/bookmark';

function* toggle({ payload }: Payload<ISearch>) {
  try {
    const settingState: ReturnType<typeof settings> = yield select(
      state => state.setting,
    );
    const bookmarkState: ReturnType<typeof bookmarks> = yield select(
      state => state.bookmark,
    );
    const { downloadsPath } = settingState.settings;
    const alreadyExists = bookmarkState.bookmarks.some(
      bookmark => bookmark.id === payload.id,
    );
    if (downloadsPath) {
      window.Main.toggleBookmark(payload, downloadsPath, !alreadyExists);
    }
  } catch (e) {
    console.log({ e });
  }
}

function* toggleBookmarkWatcher() {
  yield takeLatest(toggleBookmark, toggle);
}

export default function* wallpaperSaga() {
  yield all([fork(toggleBookmarkWatcher)]);
}
