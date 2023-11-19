import { USER_AGENT } from '../../config/config';
import { IApiResponse, IRequestOptions } from './types';

const makeHttpRequest = async (
  url: string,
  options: IRequestOptions = {}
): Promise<IApiResponse> => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT
    },
    ...options
  };

  if (options.data) {
    // @ts-expect-error - TODO
    defaultOptions.body = JSON.stringify(options.data);
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const response: Response = await fetch(url, defaultOptions);

    const result: IApiResponse = {
      statusCode: response.status,
      // @ts-expect-error - TODO
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text()
    };

    return result;
  } catch (error) {
    throw error;
  }
};

export default makeHttpRequest;
