import { ISetting } from '@/types/setting';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Types = {
  UPDATE_SETTING: 'setting/UPDATE_SETTING',
};

interface SettingState {
  settings: ISetting;
}

const initialState: SettingState = {
  settings: {
    apiToken: null,
    minutesToRefresh: 5,
    downloadsPath: null,
  },
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateSetting(state, action: PayloadAction<ISetting>) {
      state.settings = action.payload;
      if (action.payload.apiToken) {
        localStorage.setItem('api-key', action.payload.apiToken);
      }
    },
  },
});

export const { updateSetting } = settingSlice.actions;
export default settingSlice.reducer;
