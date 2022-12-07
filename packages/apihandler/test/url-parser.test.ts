import { parsePathParam } from '../src/url-parser';

describe('parsePathParam', () => {
  describe('with single word', () => {
    const path = parsePathParam('foo');

    it('returns the word as basename', () => {
      expect(path).toEqual({
        basename: 'foo'
      });
    });
  });

  describe('with multiple words (url encoded)', () => {
    const path = parsePathParam('antonio%20banderas');

    it('returns url decoded words as basename', () => {
      expect(path).toEqual({
        basename: 'antonio banderas'
      });
    });
  });

  describe('with extension', () => {
    const path = parsePathParam('antonio%20banderas.gif');

    it('returns basename and extension', () => {
      expect(path).toEqual({
        basename: 'antonio banderas',
        extension: '.gif'
      });
    });
  });

  describe('with special characters', () => {
    it('works with dashes', () => {
      const path = parsePathParam('high-five.gif');

      expect(path).toEqual({
        basename: 'high-five',
        extension: '.gif'
      });
    });

    it('works with underscores', () => {
      const path = parsePathParam('high_five.gif');

      expect(path).toEqual({
        basename: 'high_five',
        extension: '.gif'
      });
    });
  });
});
