import api from '@/services/api';
import {
  IApiResponseError,
  ISearch,
  ISearchAPIParams,
  ISearchParams,
  Payload,
} from '@/types';
import { fork, takeLatest, all, call, put, select } from 'redux-saga/effects';
import wallpapers, {
  getSearch,
  getSearchFailure,
  getSearchSuccess,
  getWallpaper,
  getWallpaperFailure,
  getWallpaperSuccess,
} from '../ducks/wallpaper';

function* search({ payload }: Payload<ISearchParams>) {
  try {
    const addToFinal = payload.options?.addToFinal || false;
    const resetPage = payload.options?.resetPage || false;

    const wallpapersState: ReturnType<typeof wallpapers> = yield select(
      state => state.wallpaper,
    );
    const actualParams = wallpapersState.searchParams;

    const newParams: ISearchAPIParams = JSON.parse(
      JSON.stringify(actualParams?.params),
    );

    if (newParams) {
      Object.keys(newParams).forEach(param => {
        if (Array.isArray(newParams[param])) {
          newParams[param] = newParams[param].join(',');
        }
      });
    }

    const { status, data } = yield call(api.get, '/search', {
      params: {
        ...newParams,
        page: resetPage ? 1 : newParams?.page || 1,
      },
    });
    if (status === 200 && data) {
      let finalData: ISearch[] = data.data;
      if (addToFinal) {
        const newSearch: ISearch[] = wallpapersState.search
          ? JSON.parse(JSON.stringify(wallpapersState.search))
          : [];
        finalData = [...newSearch, ...finalData];
      }
      yield put(
        getSearchSuccess({
          meta: data.meta,
          data: finalData,
        }),
      );
    } else {
      yield put(getSearchFailure({ status, error: data.error }));
    }
  } catch (err: any) {
    yield put(
      getSearchFailure({
        status: err?.response?.status || 500,
        error:
          (err?.response?.data as IApiResponseError)?.error ||
          'Internal Server Error',
      }),
    );
  }
}

function* wallpaper({ payload: id }: Payload<string>) {
  try {
    const { status, data } = yield call(api.get, `/w/${id}`);
    if (status === 200 && data) {
      yield put(getWallpaperSuccess(data.data));
    } else {
      yield put(getWallpaperFailure);
    }
  } catch (e) {
    yield put(getWallpaperFailure);
  }
}

function* searchWatcher() {
  yield takeLatest(getSearch, search);
}

function* wallpaperWatcher() {
  yield takeLatest(getWallpaper, wallpaper);
}

export default function* wallpaperSaga() {
  yield all([fork(searchWatcher), fork(wallpaperWatcher)]);
}
