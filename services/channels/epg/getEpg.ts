import { API_ENDPOINTS } from '../../../config/config';
import makeHttpRequest from '../../../utils/makeHttpRequest/makeHttpRequest';
import { IApiResponse } from '../../../utils/makeHttpRequest/types';
import { IEpgResponse } from './types';

const getEpg = async (channelId: number, dayOffset: number): Promise<IEpgResponse> => {
  const apiUrl = API_ENDPOINTS.epg(channelId, dayOffset);
  const response: IApiResponse = await makeHttpRequest(apiUrl);
  // console.log('apiUrl', apiUrl, 'response', response);
  return JSON.parse(response.body);
};

export default getEpg;
