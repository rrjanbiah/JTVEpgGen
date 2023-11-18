import fs from 'fs';
import figlet from 'figlet';
import { Command } from 'commander';
import { argv } from 'process';
import ejs from 'ejs';
import http from 'http';
import https from 'https';
import chalk from 'chalk';
import { API_EPG_URL } from './config';
import { IChannel, IEpgResponse, IPackage, IProgramme } from './types';

let appVersion: string = '0.0.1';
let appDescription: string = argv[0];

try {
  const packageJsonContent = fs.readFileSync('./package.json', 'utf-8');
  const packageJson: IPackage = JSON.parse(packageJsonContent);
  appVersion = packageJson.version;
  if (packageJson.description) {
    appDescription = packageJson.description;
  }
} catch (error) {
  /* empty */
}

console.log(chalk.bgGreenBright.whiteBright(figlet.textSync('JTVEpgGen')));

const program = new Command();
program
  .version(appVersion)
  .description(appDescription)
  .option('-d, --days  [value]', 'Number of days')
  .option('-v, --verbose  [value]', 'Verbose level')
  .parse(process.argv);

const options = program.opts();

console.log('options', options);

const channel: IChannel[] = [];
const programme: IProgramme[] = [];

function fetchEpg(url: string): Promise<IEpgResponse> {
  const protocol = url.startsWith('https://') ? https : http;

  return new Promise((resolve, reject) => {
    const request = protocol.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          // console.debug('data', data);
          const jsonData: IEpgResponse = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(new Error('Failed to parse JSON response.'));
        }
      });
    });

    request.on('error', (error) => {
      reject(new Error(`Failed to fetch data: ${(error as Error).message}`));
    });

    request.end();
  });
}

if (options.days) {
  const numDays: number = +options.days;
  (async () => {
    try {
      const url = API_EPG_URL;
      const jsonData = await fetchEpg(url);
      const templateContent = fs.readFileSync('./template.ejs', 'utf8');
      const epgXml = ejs.render(templateContent, jsonData);

      fs.writeFileSync('EPG.xml', epgXml);
      console.log('Conversion successful. EPG.xml created.');
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  })();
}
