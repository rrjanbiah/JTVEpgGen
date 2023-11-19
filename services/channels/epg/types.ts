export enum EBusinessType {
  Jio = 'jio'
}

export enum EPcr {
  Empty = '\n'
}

export enum EPlanType {
  Premium = 'premium'
}

export interface IEpg {
  srno: number;
  showId: string;
  showtime: string;
  showname: string;
  description: string;
  director: string;
  starCast: string;
  duration: number;
  endtime: string;
  showCategory: string;
  showGenre: string[];
  episode_num: number;
  willRepeat: boolean;
  episode_desc: string;
  isCatchupAvailable: boolean;
  twitter_handle: string;
  keywords: string[];
  premiumText: string;
  isCam: number;
  pcr: EPcr;
  channel_id: number;
  startTime: number;
  showLanguageId: number;
  showCategoryId: number;
  renderImage: boolean;
  episodeThumbnail: string;
  episodePoster: string;
  isLiveAvailable: boolean;
  canRecord: boolean;
  canRecordStb: boolean;
  stbCatchupAvailable: boolean;
  isDownloadable: boolean;
  startEpoch: number;
  endEpoch: number;
  channel_name: string;
  is_premium: boolean;
  plan_type: EPlanType;
  business_type: EBusinessType;
  isPastEpisode: boolean;
  showGenreId?: number;
}

export interface IEpgResponse {
  epg: IEpg[];
  channel_id: number;
  channel_name: string;
  screenType: number;
  logoUrl: string;
  broadcasterId: number;
  serverDate: Date;
  isCam: number;
  plan_type: EPlanType;
  business_type: EBusinessType;
  os: string[];
  deviceType: string[];
  user_category: string[];
  channel_category_name: string;
}
