'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  project.model.transpiler.options = {
    'plugins': [
      'transform-es2015-modules-amd'
    ]
  };

  project.addToContent(
    ProjectItem.resource('.eslintrc.json', 'content/eslintrc.json'),
    ProjectItem.resource('.babelrc.js', 'content/babelrc.webpack.js'),
    ProjectItem.resource('jsconfig.json', 'content/jsconfig-webpack.json')
  )
  .addToDevDependencies(
    'babel-eslint',
    'babel-loader',
    'babel-plugin-syntax-flow@next',
    'babel-plugin-transform-class-properties@next',
    'babel-plugin-transform-decorators@next',
    'babel-plugin-transform-flow-strip-types@next',
    'babel-polyfill@next',
    'babel-preset-env@next',
    'babel-preset-es2015@next',
    'babel-preset-stage-1@next',
    'babel-register@next',
    'babel-plugin-istanbul'
  );
};
