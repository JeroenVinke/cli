'use strict';

module.exports = class UI {
  constructor() {
    this.multiselect = jasmine.createSpy('multiselect').and.returnValue(Promise.resolve());
  }
};
