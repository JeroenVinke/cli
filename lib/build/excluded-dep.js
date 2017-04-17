'use strict';

const Utils = require('./utils');

exports.ExcludedDep = class {
  constructor(packageName, dep, origin) {
    this.packageName = packageName;
    this.dep = Utils.stripJSExtension(dep);

    if (origin) {
      this.origin = Utils.resolveRelativeModuleId(origin, packageName);
    }
  }
};
