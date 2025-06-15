#!/usr/bin/env node

import { program } from 'commander';
import { convertTheme } from '../lib/converter.js';
import fs from 'fs';
import path from 'path';

program
  .name('bootswatch-to-mui')
  .description('Convert Bootswatch SCSS theme into MUI theme configuration')
  .argument('<input>', 'Path to _variables.scss')
  .option('-o, --output <file>', 'Output file (defaults to stdout)')
  .action((input, options) => {
    try {
      const theme = convertTheme(path.resolve(input));
      const output = JSON.stringify(theme, null, 2);

      if (options.output) {
        fs.writeFileSync(path.resolve(options.output), output);
        console.log(`✅ MUI theme written to ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  });

program.parse();
