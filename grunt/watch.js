/**
 * This task watches for files changes and kicks off the unit tests.
 */
module.exports = function(grunt, configs) {
  return {
    scripts: {
      files: ["test/**", "src/**"],
      tasks: ["test"]
    }
  };
};
