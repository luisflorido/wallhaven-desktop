import { ISearch } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Types = {
  ADD_BOOKMARK: 'bookmark/ADD_BOOKMARK',
};

interface BookmarkState {
  bookmarks: ISearch[];
  downloadCheckLoading: boolean;
}

const initialState: BookmarkState = {
  bookmarks: [],
  downloadCheckLoading: false,
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<ISearch>) {
      const oldBookmark: ISearch[] = state.bookmarks
        ? JSON.parse(JSON.stringify(state.bookmarks))
        : [];
      const findBookmarkIndex = oldBookmark.findIndex(
        bookMark => bookMark.id === action.payload.id,
      );
      if (findBookmarkIndex !== -1) {
        oldBookmark.splice(findBookmarkIndex, 1);
      } else {
        oldBookmark.push(action.payload);
      }
      state.bookmarks = oldBookmark;
    },
    checkDownloadedBookmarks(state) {
      state.downloadCheckLoading = true;
    },
    checkDownloadedBookmarksSuccess(state, action: PayloadAction<string[]>) {
      const filesInFolder = action.payload;
      const bookmarkList = state.bookmarks;
      console.tron.log({ filesInFolder, action });
      const checkAll = filesInFolder.length > 1;
      if (checkAll) {
        const newBookmarks = bookmarkList.map(bookmark => {
          const fileExists = filesInFolder.some(
            fileName => fileName === bookmark.id,
          );
          if (fileExists) {
            bookmark.downloaded = true;
          } else if (checkAll && !fileExists) {
            bookmark.downloaded = false;
          }
          return bookmark;
        });
        state.bookmarks = newBookmarks;
      } else if (!checkAll && filesInFolder.length === 1) {
        const findBookmark = bookmarkList.find(
          bookmark => bookmark.id === filesInFolder[0],
        );
        if (findBookmark) {
          findBookmark.downloaded = true;
        }
      }
      state.downloadCheckLoading = false;
    },
    checkDownloadedBookmarksFailure(state) {
      state.downloadCheckLoading = false;
    },
  },
});

export const {
  toggleBookmark,
  checkDownloadedBookmarks,
  checkDownloadedBookmarksSuccess,
  checkDownloadedBookmarksFailure,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
