import { nockBack } from './config/nock-back';
import { getSecretString, getSecretJson } from '../src/aws';

describe('aws', () => {
  describe('getSecretString', () => {
    it('does something', async () => {
      const { nockDone } = await nockBack('aws/get-secret-string.json');
      const response = await getSecretString('SecretA720EF05-i12QBJ2Bxjd1');
      nockDone();

      expect(response).toMatch(/{"apiToken":"\w+"}/);
    });
  });

  describe('getSecretJson', () => {
    it('does something', async () => {
      const { nockDone } = await nockBack('aws/get-secret-json.json');
      const response = await getSecretJson('SecretA720EF05-i12QBJ2Bxjd1');
      nockDone();

      expect(response).toHaveProperty('apiToken');
      expect(response.apiToken).toMatch(/\w+/);
    });
  });
});
