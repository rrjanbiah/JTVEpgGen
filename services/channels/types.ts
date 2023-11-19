export interface IChannel {
  channel_id: number;
  channel_order: string;
  channel_name: string;
  channelCategoryId: number;
  channelLanguageId: number;
  isHD: boolean;
  isCatchupAvailable: boolean;
  isCam: number;
  screenType: number;
  broadcasterId: number;
  logoUrl: string;
  packageIds: string[];
  playbackRightIds: string[];
}

export interface IChannelsResponse {
  code: number;
  message: string;
  result?: Partial<IChannel[]>;
}
