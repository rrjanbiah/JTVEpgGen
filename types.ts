export interface IPackage {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: Record<string, string>;
  repository?: string | { type: string; url: string };
  keywords?: string[];
  author?: string;
  license?: string;
  bugs?: string | { url: string; email?: string };
  homepage?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  bundledDependencies?: string[];
  engines?: Record<string, string>;
  os?: string[];
  cpu?: string[];
  private?: boolean;
  publishConfig?: {
    registry?: string;
    tag?: string;
  };
  [key: string]: unknown;
}

export interface IEpgResponse {
  startEpoch: number;
  endEpoch: number;
  channel_id: string;
  srno: string;
  showname: string;
  description: string;
  showCategory: string;
  episodePoster: string;
  episode_num: number;
  director?: string;
  starCast?: string;
  episode_desc?: string;
}

export interface IChannel {
  '@id': string;
  'display-name': string;
  icon: {
    '@src': string;
  };
}

export interface IProgramme {
  '@start': string;
  '@stop': string;
  '@channel': string;
  '@catchup-id': string;
  title: string;
  desc: string;
  category: string;
  icon: {
    '@src': string;
  };
  'episode-num'?: {
    '@system': string;
    '#text': string;
  };
  credits?: {
    director?: string;
    actor?: string[];
  };
  'sub-title'?: string;
}

export interface IEpg {
  tv: {
    channel: IChannel[];
    programme: IProgramme[];
  };
}
