import { nockBack } from './config/nock-back';
import { getSecretString, getSecretJson } from '../src/aws';

describe('aws', () => {
  describe('getSecretString', () => {
    it('does something', async () => {
      const { nockDone } = await nockBack('aws/get-secret-string.json');
      const response = await getSecretString('Secret6C6F413D-mb34HuX4P5Mt');
      nockDone();

      expect(response).toMatch(/{"apiToken":"\w+"}/);
    });
  });

  describe('getSecretJson', () => {
    it('does something', async () => {
      const { nockDone } = await nockBack('aws/get-secret-json.json');
      const response = await getSecretJson('Secret6C6F413D-mb34HuX4P5Mt');
      nockDone();

      expect(response).toHaveProperty('apiToken');
      expect(response.apiToken).toMatch(/\w+/);
    });
  });
});
