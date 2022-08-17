import { ISearch } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Types = {
  ADD_BOOKMARK: 'bookmark/ADD_BOOKMARK',
};

interface BookmarkState {
  bookmarks: ISearch[];
}

const initialState: BookmarkState = {
  bookmarks: [],
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
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
