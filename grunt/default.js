/**
 * This sets the default grunt task to the usage task
 */
module.exports = function(grunt, configs) {
  grunt.registerTask("default", "usage");

  // This task does not accept any configurations
  return null;
};
