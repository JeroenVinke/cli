'use strict';
const RequireJSAuRun = require('./requirejs/au-run');
const RequireJSAuTest = require('./requirejs/au-test');
const RequireJSAuLint = require('./requirejs/au-lint');

module.exports = {
  requirejs: {
    run: RequireJSAuRun,
    test: RequireJSAuTest,
    lint: RequireJSAuLint
  }
};
