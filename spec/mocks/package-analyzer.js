'use strict';

module.exports = class PackageAnalyzer {
  constructor() {
    this.reverseEngineer = jasmine.createSpy('reverseEngineer').and.returnValue(Promise.resolve({ loaderConfig: {} }));
  }
};
