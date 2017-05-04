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
    ProjectItem.resource('.babelrc', 'content/babelrc'),
    ProjectItem.resource('jsconfig.json', 'content/jsconfig-webpack.json')
  );
};
