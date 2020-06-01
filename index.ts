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
  const filePath = path.join(__dirname, program.entry);
  console.log(filePath);
  if (fs.existsSync(filePath))
    console.log(`File didn't exists: ${filePath}`.red);

  const fileName = path.basename(filePath);
  const extName = path.extname(fileName);
  if (extName !== '.wyrd')
    console.log(`Entry file should have \`.wyrd\` extension.`.red);
  if (/.lib$/.test(fileName))
    console.log(`Wyrd compiler is not expected to compile library file directly, it should be imported by other Wyrd program`.red);

  const fileDir = path.dirname(filePath);
  const { result } = compile({ dir: fileDir, entry: fileName });

  fs.writeFileSync(path.join(__dirname, `${fileName}.js`), result);
};