import {
  IApiError,
  IApiResponse,
  IPageMeta,
  ISearch,
  ISearchParams,
  IWallpaper,
} from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Types = {
  GET_SEARCH: 'wallpapers/GET_SEARCH',
  GET_SEARCH_SUCCESS: 'wallpapers/GET_SEARCH_SUCCESS',
  GET_SEARCH_FAILURE: 'wallpapers/GET_SEARCH_FAILURE',
};

interface WallpaperState {
  loadingSearch: boolean;
  search: ISearch[] | null;
  searchParams: ISearchParams | null;
  searchMeta: IPageMeta | null;
  lastSearch: number | null;
  searchError: IApiError | null;

  loadingWallpaper: boolean;
  wallpaper: IWallpaper | null;
}

const initialState: WallpaperState = {
  loadingSearch: false,
  search: null,
  searchMeta: null,
  searchParams: {
    params: {
      categories: '111',
      purity: '100',
      sorting: 'date_added',
      ratios: ['landscape', 'portrait'],
      order: 'desc',
    },
  },
  lastSearch: null,
  searchError: null,

  loadingWallpaper: false,
  wallpaper: null,
};

const wallpaperSlice = createSlice({
  name: 'wallpaper',
  initialState,
  reducers: {
    getSearch(state, action: PayloadAction<ISearchParams>) {
      const oldParams: ISearchParams = state.searchParams
        ? JSON.parse(JSON.stringify(state.searchParams))
        : {};
      state.loadingSearch = true;
      state.searchParams = {
        options: { ...oldParams.options, ...action.payload.options },
        params: { ...oldParams.params, ...action.payload.params },
      };
    },
    getSearchSuccess(state, action: PayloadAction<IApiResponse<ISearch[]>>) {
      state.search = action.payload.data;
      state.searchMeta = action.payload.meta;
      state.lastSearch = +new Date();
      state.loadingSearch = false;
    },
    getSearchFailure(state, action: PayloadAction<IApiError>) {
      state.loadingSearch = false;
      state.searchError = action.payload;
    },
    getSearchClear(state) {
      state.loadingSearch = initialState.loadingSearch;
      state.searchError = initialState.searchError;
    },
    updateSearchParams(state, action: PayloadAction<ISearchParams>) {
      state.searchParams = action.payload;
    },

    getWallpaper(state, _: PayloadAction<string>) {
      state.loadingWallpaper = true;
    },
    getWallpaperSuccess(state, action: PayloadAction<IWallpaper>) {
      state.loadingWallpaper = false;
      state.wallpaper = action.payload;
    },
    getWallpaperFailure(state) {
      state.loadingWallpaper = false;
    },
    getWallpaperClean(state) {
      state.loadingWallpaper = false;
      state.wallpaper = null;
    },
  },
});

export const {
  getSearch,
  getSearchSuccess,
  getSearchFailure,
  getSearchClear,
  getWallpaper,
  getWallpaperSuccess,
  getWallpaperFailure,
  getWallpaperClean,
  updateSearchParams,
} = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
