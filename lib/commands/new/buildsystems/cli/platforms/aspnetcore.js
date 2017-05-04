'use strict';

const ProjectItem = require('../../../../../project-item').ProjectItem;

module.exports = function(project) {
  project.configureVisualStudioStructure(project.model.loader.id);
  project.configureDist(ProjectItem.directory('scripts'));
  project.configureDefaultSetup();
};
