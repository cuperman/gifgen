import { handler } from '../src/index';

describe('index', () => {
  describe('handler', () => {
    it('returns a promise', () => {
      expect(handler()).toBeInstanceOf(Promise);
    });
  });
});
