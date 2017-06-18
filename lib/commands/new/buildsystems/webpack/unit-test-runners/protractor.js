'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  project.addToDevDependencies(
    'aurelia-protractor-plugin',
    'protractor'
  ).addToContent(
    project.tests.add(
      project.e2e.add(
        ProjectItem.resource('demo.e2e.ext', `${testContentRoot}/e2e/demo.e2e.ext`, project.model.transpiler),
        ProjectItem.resource('skeleton.po.ext', `${testContentRoot}/e2e/skeleton.po.ext`, project.model.transpiler),
        ProjectItem.resource('welcome.po.ext', `${testContentRoot}/e2e/welcome.po.ext`, project.model.transpiler)
      ),
      ProjectItem.resource('protractor.conf.js', `${testContentRoot}/protractor.conf.js`)
    )
  );
};
