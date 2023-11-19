import * as fs from 'fs';
import { IPackage, IPackageInfo } from './types';

const parsePackageJson = (): IPackageInfo => {
  const packageInfo: IPackageInfo = {
    appVersion: '0.0.1',
    appDescription: '',
    appHomepage: 'https://github.com/rrjanbiah/JTVEpgGen#readme'
  };
  try {
    const packageJsonContent = fs.readFileSync('./package.json', 'utf-8');
    const packageJson: IPackage = JSON.parse(packageJsonContent);
    packageInfo.appVersion = packageJson.version;
    packageInfo.appDescription = packageJson.description;
    packageInfo.appHomepage = packageJson.homepage;
    return packageInfo;
  } catch (error) {
    return packageInfo;
  }
};

export default parsePackageJson;
