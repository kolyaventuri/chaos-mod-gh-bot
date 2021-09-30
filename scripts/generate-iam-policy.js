"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var yargs_1 = __importDefault(require("yargs/yargs"));
var helpers_1 = require("yargs/helpers");
var argv = (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv)).options({
    stage: { type: 'string', "default": 'dev' }
}).parseSync();
var file = path_1["default"].join(__dirname, '../serverless.yml');
var ymlData = fs_1["default"].readFileSync(file, { encoding: 'utf-8' });
var dotenv = fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../.env'), { encoding: 'utf-8' });
var serviceName = (_a = /^service:(.+)$/gmi.exec(ymlData)) === null || _a === void 0 ? void 0 : _a[1].trim();
var region = (_b = /^\s+region:(.+)/gm.exec(ymlData)) === null || _b === void 0 ? void 0 : _b[1].trim();
var stage = argv.stage;
var awsID = (_c = /^AWS_ID=(\d+)$/gm.exec(dotenv)) === null || _c === void 0 ? void 0 : _c[1].trim();
if (!serviceName || !region || !stage || !awsID) {
    console.log({ serviceName: serviceName, region: region, stage: stage, awsID: awsID });
    throw new Error('Missing data. Check for missing values in the above.');
}
var template = fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../fixtures/iam.json'), { encoding: 'utf-8' }).toString();
template = template.replace(/{{REGION}}/g, region);
template = template.replace(/{{AWS_ID}}/g, awsID);
template = template.replace(/{{STAGE}}/g, stage);
template = template.replace(/{{SERVICE_NAME}}/g, serviceName);
var writeDir = path_1["default"].join(__dirname, '../iam');
if (!fs_1["default"].existsSync(writeDir)) {
    fs_1["default"].mkdirSync(writeDir);
}
var writeFile = path_1["default"].join(writeDir, stage + ".policy.json");
fs_1["default"].writeFileSync(writeFile, template, { encoding: 'utf-8' });
console.log("Wrote IAM policy to " + writeFile);
