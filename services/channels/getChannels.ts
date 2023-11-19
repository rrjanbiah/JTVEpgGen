import { API_ENDPOINTS } from '../../config/config';
import makeHttpRequest from '../../utils/makeHttpRequest/makeHttpRequest';
import { IApiResponse } from '../../utils/makeHttpRequest/types';
import { IChannelsResponse } from './types';

const getChannels = async (): Promise<IChannelsResponse> => {
  const apiUrl = API_ENDPOINTS.channels();
  const response: IApiResponse = await makeHttpRequest(apiUrl);
  return JSON.parse(response.body);
};

export default getChannels;
