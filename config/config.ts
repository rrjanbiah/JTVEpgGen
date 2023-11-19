import { TApiEndpoint } from '../utils/makeHttpRequest/types';

export const API_BASE_URL = 'https://jiotv.data.cdn.jio.com';

export const API_ENDPOINTS: Record<string, TApiEndpoint> = {
  channels: () => `${API_BASE_URL}/apis/v1.4/getMobileChannelList/get/?os=android&devicetype=phone`,

  epg: (channelId: number, dayOffset: number) =>
    `${API_BASE_URL}/apis/v1.3/getepg/get?channel_id=${channelId}&offset=${dayOffset}&langId=6`
};

export const IMG_PATH = 'http://jiotv.catchup.cdn.jio.com/dare_images/';
