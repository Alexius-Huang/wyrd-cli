#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import { compile } from '@wyrd/compiler';
import 'colors';

program.version('0.0.1');

program
  .option('-e, --entry <string>', 'entry of wyrd file');

program.parse(process.argv);

if (program.entry) {
  const entry = path.join(process.cwd(), program.entry);
  if (!fs.existsSync(entry))
    console.log(`File didn't exists: ${entry}`.red);
  else {
    const fileDir = path.dirname(entry);
    const fileName = path.basename(entry);
    const extName = path.extname(fileName);

    if (extName !== '.wyrd') {
      console.log(`Entry file should have \`.wyrd\` extension.`.red);
    } else if (/.lib$/.test(fileName)) {
      console.log(`Wyrd compiler is not expected to compile library file directly, it should be imported by other Wyrd program`.red);
    } else try {
      const { result } = compile({ entry });

      const compiledFileName = `${fileName.replace(/\.wyrd$/, '')}.js`;
      const compiledFilePath = path.join(fileDir, compiledFileName);
      fs.writeFileSync(compiledFilePath, result);
      console.log(`Emit result: ${compiledFilePath.cyan}`);
    } catch (err) {
      console.log(err.message.red);
    }
  }
};
