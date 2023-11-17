import * as fs from 'fs';
import figlet from 'figlet';
import { Command } from 'commander';
import { argv } from 'process';
import { IPackage } from './types';

let appVersion: string = '0.0.1';
let appDescription: string = argv[0];

try {
  const packageJsonContent = fs.readFileSync('./package.json', 'utf-8');
  const packageJson: IPackage = JSON.parse(packageJsonContent);
  appVersion = packageJson.version;
  if (packageJson.description) appDescription = packageJson.description;
} catch (error) {
  /* empty */
}

console.log(figlet.textSync('JTVEpgGen'));

const program = new Command();
program
  .version(appVersion)
  .description(appDescription)
  .option('-d, --days  [value]', 'Number of days')
  .option('-v, --verbose  [value]', 'Verbose level')
  .parse(process.argv);

const options = program.opts();

console.log('options', options);
