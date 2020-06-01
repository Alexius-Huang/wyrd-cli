"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var commander_1 = require("commander");
var compiler_1 = require("@wyrd/compiler");
require("colors");
commander_1.program.version('0.0.1');
commander_1.program
    .option('-e, --entry <string>', 'entry of wyrd file');
commander_1.program.parse(process.argv);
if (commander_1.program.entry) {
    var filePath = path.join(__dirname, commander_1.program.entry);
    console.log(filePath);
    if (fs.existsSync(filePath))
        console.log(("File didn't exists: " + filePath).red);
    var fileName = path.basename(filePath);
    var extName = path.extname(fileName);
    if (extName !== '.wyrd')
        console.log("Entry file should have `.wyrd` extension.".red);
    if (/.lib$/.test(fileName))
        console.log("Wyrd compiler is not expected to compile library file directly, it should be imported by other Wyrd program".red);
    var fileDir = path.dirname(filePath);
    var result = compiler_1.compile({ dir: fileDir, entry: fileName }).result;
    fs.writeFileSync(path.join(__dirname, fileName + ".js"), result);
}
;
