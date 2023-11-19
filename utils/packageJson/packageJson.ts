import * as fs from 'fs';
import { IPackage, IPackageInfo } from './types';

const parsePackageJson = (): IPackageInfo => {
  const packageInfo = {
    appVersion: '0.0.1',
    appDescription: ''
  };
  try {
    const packageJsonContent = fs.readFileSync('./package.json', 'utf-8');
    const packageJson: IPackage = JSON.parse(packageJsonContent);
    packageInfo.appVersion = packageJson.version;
    if (packageJson.description) {
      packageInfo.appDescription = packageJson.description;
    }
    return packageInfo;
  } catch (error) {
    return packageInfo;
  }
};

export default parsePackageJson;
