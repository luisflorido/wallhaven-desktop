import { ISearch, Payload } from '@/types';
import {
  fork,
  takeLatest,
  all,
  select,
  put,
  call,
  take,
} from 'redux-saga/effects';
import settings from '@/store/ducks/setting';
import bookmarks, {
  checkDownloadedBookmarks,
  checkDownloadedBookmarksSuccess,
  toggleBookmark,
} from '@/store/ducks/bookmark';
import { eventChannel } from 'redux-saga';

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

function* updateDownloadedList(filesInFolder: string[]) {
  // if (checkAll) {
  //   const newBookmarks = bookmarkList.map(bookmark => {
  //     const fileExists = filesInFolder.some(
  //       fileName => fileName === bookmark.id,
  //     );
  //     if (fileExists) {
  //       bookmark.downloaded = true;
  //     } else if (checkAll && !fileExists) {
  //       bookmark.downloaded = false;
  //     }
  //     return bookmark;
  //   });
  //   yield put(checkDownloadedBookmarksSuccess(filesInFolder));
  // } else if (!checkAll && filesInFolder.length === 1) {
  //   const findBookmark = bookmarkList.find(
  //     bookmark => bookmark.id === filesInFolder[0],
  //   );
  //   if (findBookmark) {
  //     findBookmark.downloaded = true;
  //   }
  // }
  yield put(checkDownloadedBookmarksSuccess(filesInFolder));
}

function* checkDownloaded() {
  const settingState: ReturnType<typeof settings> = yield select(
    state => state.setting,
  );
  const { downloadsPath } = settingState.settings;

  if (downloadsPath) {
    window.Main.checkDownloadedBookmarks(downloadsPath);
  }
}

function* toggleBookmarkWatcher() {
  yield takeLatest(toggleBookmark, toggle);
}

function* checkDownloadedBookmarksWatcher() {
  yield takeLatest(checkDownloadedBookmarks, checkDownloaded);
}

function* checkDownloadedChannel() {
  try {
    const channel = eventChannel(listener => {
      window.Main.on(
        'check-downloaded-bookmarks',
        (filesInFolder: string[]) => {
          listener(filesInFolder);
        },
      );
      return () => {};
    });

    while (true) {
      const filesInFolder = yield take(channel);

      yield updateDownloadedList(filesInFolder);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* wallpaperSaga() {
  yield all([
    fork(toggleBookmarkWatcher),
    fork(checkDownloadedBookmarksWatcher),
    call(checkDownloadedChannel),
  ]);
}
