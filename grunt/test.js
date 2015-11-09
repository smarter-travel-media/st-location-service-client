/**
 * This creates an alias task to run eslint and unit tests at the same time.
 * Usage grunt test
 */
module.exports = function(grunt, configs) {
  grunt.registerTask("test", ["eslint", "run:test"]);

  // This task does not accept any configurations
  return null;
};
