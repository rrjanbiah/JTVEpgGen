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

export interface IPackageInfo {
  appVersion: string;
  appDescription: string;
}
