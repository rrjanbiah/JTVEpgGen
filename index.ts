import * as fs from 'fs';
import * as zlib from 'zlib';
import * as figlet from 'figlet';
import { Command } from 'commander';
import * as ejs from 'ejs';

import path = require('path');
import getChannels from './services/channels/getChannels';
import { IChannel } from './services/channels/types';
import { IEpg, IEpgResponse } from './services/channels/epg/types';
import getEpg from './services/channels/epg/getEpg';
import getRandomInt from './utils/math/random';
import delay from './utils/process/delay';
import { IMG_PATH } from './config/config';
import parsePackageJson from './utils/packageJson/packageJson';

const { appVersion, appDescription, appHomepage } = parsePackageJson();

console.log(figlet.textSync('JTVEpgGen'));
console.log(appHomepage, '\n');

const program = new Command();
program
  .version(appVersion)
  .description(appDescription)
  .option('-s, --startDayOffset  [value]', 'Start day offset between -7 and 7')
  .option('-e, --endDayOffset  [value]', 'End day offset between -7 and 7')
  .option('-d, --delayUnit  [value]', 'Delay unit; 1 means milli second')
  .parse(process.argv);

const options = program.opts();

const startDayOffset: number = +options.startDayOffset || 0;
const endDayOffset: number = +options.endDayOffset || 0;
const delayUnit: number = +options.delayUnit || 100;

(async () => {
  getChannels().then(async (response) => {
    if ('result' in response) {
      const channels: IChannel[] = response.result;
      console.log(
        'Total Channels',
        channels.length,
        'startDayOffset',
        startDayOffset,
        'endDayOffset',
        endDayOffset,
        'delayUnit',
        delayUnit
      );

      const compiledAsyncProgramTemplate = ejs.compile(
        fs.readFileSync('./templates/partial.program.ejs', 'utf8'),
        { async: true }
      );

      const channelsXml: string = await ejs.render(
        fs.readFileSync('./templates/partial.channel.ejs', 'utf8'),
        { channels },
        { async: true }
      );

      let programsXml: string = '';
      // eslint-disable-next-line no-restricted-syntax -- As forEach can't be used in async
      for await (const channel of channels) {
        if (channel.isCatchupAvailable) {
          for (let dayOffset = startDayOffset; dayOffset <= endDayOffset; dayOffset += 1) {
            try {
              const randDelay: number = getRandomInt(1, 7) * delayUnit;
              // eslint-disable-next-line no-await-in-loop -- Intentional
              await delay(randDelay);
              // eslint-disable-next-line no-await-in-loop -- Intentional
              const resp = await getEpg(channel.channel_id, dayOffset);
              const epgResponse: IEpgResponse = resp;
              const epgs: IEpg[] = epgResponse.epg;
              // eslint-disable-next-line no-await-in-loop -- Intentional
              programsXml += await compiledAsyncProgramTemplate({ epgs, IMG_PATH });
            } catch (error) {
              console.log('Error: ', (error as Error).message, 'Channel ID', channel.channel_id);
            }
          }
        }
      }

      const epgXml: string = await ejs.render(
        fs.readFileSync('./templates/epg.xml.ejs', 'utf8'),
        { channelsXml, programsXml },
        { async: true }
      );

      const epgXmlGzPath: string = './dist/epg.xml.gz';
      // if path not exists...
      const dir = path.dirname(epgXmlGzPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const epgXmlWithoutEmptyNewline: string = epgXml.replace(/^\s*[\r\n]/gm, '');
      fs.writeFileSync(epgXmlGzPath, zlib.gzipSync(epgXmlWithoutEmptyNewline));
      console.log(`${epgXmlGzPath} created.`);
    }
  });
})();
