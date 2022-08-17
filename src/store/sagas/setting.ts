import { Payload } from '@/types';
import { fork, takeLatest, all } from 'redux-saga/effects';
import { updateSetting } from '@/store/ducks/setting';
import { ISetting } from '@/types/setting';

function update({ payload }: Payload<ISetting>) {
  try {
    const oldDownloadsPath = localStorage.getItem('download-path');
    const newDownloadsPath = payload.downloadsPath;
    if (oldDownloadsPath !== newDownloadsPath) {
      if (newDownloadsPath) {
        localStorage.setItem('download-path', newDownloadsPath);
      } else {
        localStorage.removeItem('download-path');
      }
      if (oldDownloadsPath && newDownloadsPath) {
        window.Main.changeBookmarkFolder(oldDownloadsPath, newDownloadsPath);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

function* updateSettingsWatcher() {
  yield takeLatest(updateSetting, update);
}

export default function* settingSaga() {
  yield all([fork(updateSettingsWatcher)]);
}
