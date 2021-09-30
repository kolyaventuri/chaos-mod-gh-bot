import path from 'path';
import fs from 'fs';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).options({
  stage: { type: 'string', default: 'dev' }
}).parseSync();

const file = path.join(__dirname, '../serverless.yml');
const ymlData = fs.readFileSync(file, {encoding: 'utf-8'});

const dotenv = fs.readFileSync(path.join(__dirname, '../.env'), {encoding: 'utf-8'});

const serviceName = /^service:(.+)$/gmi.exec(ymlData)?.[1].trim();
const region = /^\s+region:(.+)/gm.exec(ymlData)?.[1].trim();
const {stage} = argv;

const awsID = /^AWS_ID=(\d+)$/gm.exec(dotenv)?.[1].trim();

if (!serviceName || !region || !stage || !awsID) {
  console.log({serviceName, region, stage, awsID})
  throw new Error('Missing data. Check for missing values in the above.');
}

let template = fs.readFileSync(path.join(__dirname, '../fixtures/iam.json'), {encoding: 'utf-8'}).toString();
template = template.replace(/{{REGION}}/g, region);
template = template.replace(/{{AWS_ID}}/g, awsID);
template = template.replace(/{{STAGE}}/g, stage);
template = template.replace(/{{SERVICE_NAME}}/g, serviceName);

const writeDir = path.join(__dirname, '../iam');
if (!fs.existsSync(writeDir)) {
  fs.mkdirSync(writeDir);
}

const writeFile = path.join(writeDir, `${stage}.policy.json`);
fs.writeFileSync(writeFile, template, {encoding: 'utf-8'});
console.log(`Wrote IAM policy to ${writeFile}`);
