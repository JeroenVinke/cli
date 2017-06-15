'use strict';
const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  project.addToContent(
    ProjectItem.resource('tsconfig.json', 'content/tsconfig.json'),
    ProjectItem.directory('custom_typings')
      .add(
        ProjectItem.resource('fetch.d.ts', 'content/custom_typings_webpack/fetch.d.ts'),
        ProjectItem.resource('system.d.ts', 'content/custom_typings_webpack/system.d.ts')
      )
  ).addToDevDependencies(
    'awesome-typescript-loader',
    'ts-jest',
    'ts-node',
    '@types/jest',
    '@types/node',
    '@types/lodash',
    '@types/webpack',
    'typescript'
  );
};
