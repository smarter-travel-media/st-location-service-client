/**
 * This edits the package.json file before copying it to the destination directory.
 * Currently this removes any files that are not essentail to running the module.
 */
module.exports = function(grunt, configs) {
  return {
    npm: {
      destDir: "<%= dirs.npm %>",
      pretty: 2,
      remove: ["devDependencies", "engines", "private", "scripts"]
    }
  };
};
