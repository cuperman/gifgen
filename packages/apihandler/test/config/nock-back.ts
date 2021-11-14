import * as nock from 'nock';

export const nockOptions: nock.BackOptions = {
  after: (scope) => {
    scope.filteringPath(/api_key=\w*/, 'api_key=HIDDEN_CREDENTIALS');
  },
  afterRecord: (defs) => {
    return defs.map((def) => {
      const response = def.response as any;

      if (def.scope.match(/secretsmanager.us-east-1.amazonaws.com/)) {
        return {
          ...def,
          response: {
            ...response,
            ARN: response.ARN.replace(
              /arn:aws:secretsmanager:us-east-1:\d{12}:secret/,
              'arn:aws:secretsmanager:us-east-1:123456789012:secret'
            ),
            SecretString: response.SecretString.replace(/{"apiToken":"\w+"}/, '{"apiToken":"HIDDEN_TOKEN"}')
          }
        };
      } else if (def.scope.match(/api\.giphy\.com/)) {
        return {
          ...def,
          path: def.path.replace(/api_key=\w*/, 'api_key=HIDDEN_CREDENTIALS')
        };
      } else if (def.scope.match(/media.*\.giphy\.com/)) {
        return {
          ...def,
          response: '' // suppress image data
        };
      } else {
        return def;
      }
    });
  }
};

export interface NockBackResponse {
  nockDone: () => void;
  context: nock.BackContext;
}

export async function nockBack(fixtureFile: string, options?: nock.BackOptions): Promise<NockBackResponse> {
  const defaultOptions = nockOptions;
  return nock.back(fixtureFile, options || defaultOptions);
}
