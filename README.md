# JTVEpgGen

JTVEpgGen is a command-line application that generates `epg.xml.gz` from J TV API

## Usage

```bash
      _ _______     _______              ____
     | |_   _\ \   / / ____|_ __   __ _ / ___| ___ _ __
  _  | | | |  \ \ / /|  _| | '_ \ / _` | |  _ / _ \ '_ \
 | |_| | | |   \ V / | |___| |_) | (_| | |_| |  __/ | | |
  \___/  |_|    \_/  |_____| .__/ \__, |\____|\___|_| |_|
                           |_|    |___/
https://github.com/rrjanbiah/JTVEpgGen#readme

Usage: jtvepggen [options]

JTVEpgGen is a command-line application that generates epg.xml.gz from J TV API

Options:
  -V, --version                  output the version number
  -s, --startDayOffset  [value]  Start day offset between -7 and 7. Default 0.
  -e, --endDayOffset  [value]    End day offset between -7 and 7. Default 0.
  -d, --delayUnit  [value]       Delay unit; 1 means milli second. Default 100.
  -h, --help                     display help for command
```

## Tech Stack

- TypeScript
- Node
- Commander
- EJS - for templating
- pkg - for executable
- Jest
- ESLint
- Prettier

## Available Commands

`npm run`

## TODO

- [x] get channels
- [x] gzip
- [ ] Test cases
- [ ] move inside `src` (?)
