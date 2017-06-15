'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  project.model.testFramework = {
    'id': 'jasmine',
    'displayName': 'Jasmine'
  };

  let transpilerId = project.model.transpiler.id;
  let testContentRoot = `test/webpack/${transpilerId}`;

  project.addToContent(
    project.tests.add(
      project.unitTests.add(
        ProjectItem.resource('app.spec.ext', `${testContentRoot}/unit/app.spec.ext`, project.model.transpiler)
      ),
      ProjectItem.resource('karma.conf.js', `${testContentRoot}/karma.conf.js`),
      ProjectItem.resource('karma-bundle.js', `${testContentRoot}/karma-bundle.js`)
    )
  ).addToDevDependencies(
    'jasmine-core',
    'karma',
    'karma-chrome-launcher',
    'karma-coverage',
    'karma-jasmine',
    'karma-mocha-reporter',
    'karma-webpack'
  );

  if (project.model.transpiler.id === 'babel') {
    project.addToDevDependencies('karma-babel-preprocessor');

    project.addToContent(
      project.tests.add(
        project.unitTests.add(
          ProjectItem.resource('.eslintrc', `${testContentRoot}/unit/.eslintrc`)
        )
      )
    );
  } else {
    project.addToDevDependencies('karma-typescript-preprocessor', '@types/jasmine');
  }
};
