import * as dotenv from 'dotenv';
import * as nock from 'nock';
import * as path from 'path';

dotenv.config({
  path: './.env-test'
});

const nockBack = nock.back;
nockBack.fixtures = path.join(__dirname, '../__tapes__');

global.beforeEach(() => {
  nockBack.setMode('record');
});

global.afterEach(() => {
  nockBack.setMode('wild');
});
