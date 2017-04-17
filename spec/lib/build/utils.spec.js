'use strict';

const Utils = require('../../../lib/build/utils');

describe('the Utils module', () => {
  describe('resolveRelativeModuleId()', () => {
    it('slices of .js extension', () => {
      expect(Utils.resolveRelativeModuleId('c.js', 'some-package')).toBe('c');
      expect(Utils.resolveRelativeModuleId('file-without-extension', 'some-package')).toBe('file-without-extension');
    });
    it('prepends packagename when ./ is at the front of the module id', () => {
      expect(Utils.resolveRelativeModuleId('./c', 'some-package')).toBe('some-package/c');
      expect(Utils.resolveRelativeModuleId('absolute-import', 'some-package')).toBe('absolute-import');
    });
  });
});
