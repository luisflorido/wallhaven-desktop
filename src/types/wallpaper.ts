import { ImagePurity } from '.';

export interface IThumbs {
  large: string;
  original: string;
  small: string;
}

export type IRatios = 'landscape' | 'portrait';

export interface ISearchAPIParams {
  q?: string;
  categories?: string;
  purity?: string;
  ai_art_filter?: number;
  sorting?:
    | 'date_added'
    | 'relevance'
    | 'random'
    | 'views'
    | 'favorites'
    | 'toplist';
  order?: 'asc' | 'desc';
  topRange?: '1d' | '3d' | '1w' | '1M' | '3M' | '6M' | '1y';
  atleast?: string;
  resolutions?: string;
  ratios?: IRatios[];
  colors?: string;
  page?: number;
  seed?: string;
}

export interface ISearchBase {
  addToFinal?: boolean;
  resetPage?: boolean;
}

export type ISearchParams = {
  options?: ISearchBase;
  params?: ISearchAPIParams;
};

interface ISearchComplements {
  downloaded: boolean;
}

export interface ISearch extends ISearchComplements {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  purity: ImagePurity;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: IThumbs;
}

export interface IAvatar {
  '200px': string;
  '128px': string;
  '32px': string;
  '20px': string;
}

export type IUploaderGroup =
  | 'User'
  | 'Moderator'
  | 'Senior Moderator'
  | 'Developer'
  | 'Administrator'
  | 'Owner/Developer';

export interface IUploader {
  username: string;
  group: IUploaderGroup;
  avatar: IAvatar;
}

export interface ITag {
  id: number;
  name: string;
  alias: string;
  category_id: number;
  category: string;
  purity: string;
  created_at: string;
}

export interface IWallpaper {
  id: string;
  url: string;
  short_url: string;
  uploader: IUploader;
  views: number;
  favorites: number;
  source: string;
  purity: ImagePurity;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: IThumbs;
  tags: ITag[];
}

export type IFilterType = 'category' | 'purity' | 'sort' | 'search';
