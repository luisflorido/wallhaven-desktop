export * from './wallpaper';
export type ImagePurity = 'sfw' | 'sketchy' | 'nsfw';
export type ImageType = 'GENERAL' | 'ANIME' | 'PEOPLE';

export type ImageFilters = ImageType;

export type Payload<T> = { payload: T };

export type IPageMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type IApiResponse<T> = {
  data: T;
  meta: IPageMeta;
};

export type IApiError = {
  status: number;
  error: string;
};

export type IApiResponseError = {
  error: string;
};
