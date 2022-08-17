import { combineReducers } from 'redux';
import wallpaper from './wallpaper';
import bookmark from './bookmark';
import setting from './setting';

const rootReducer = combineReducers({ wallpaper, bookmark, setting });

export default rootReducer;
