'use strict';

module.exports = {
  ...require('./au-run'),
  ...require('./au-test'),
  ...require('./au-lint'),
  ...require('./au-protractor')
};
