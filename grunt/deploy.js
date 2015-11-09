var _ = require("lodash");
/**
 * This deploys the npm modules to artifactory see README.md for prereqs
 * See documentation below for more details
 */
module.exports = function(grunt, configs) {

  /**
   * Based on the flags that were given, return a two-item array where the first item is the name of the bump task to
   * run and the second item being whether or not the task should run.
   *
   * @param {String[]} flags
   * @return Array
   */
  function getBumpTaskConfigs(flags) {
    if (_.contains(flags, "disableBump")) {
      return ["bump", false];
    }

    var bumpConfig = _.find(flags, function(flag) { return _.startsWith(flag, "enableBump("); });
    if (!bumpConfig) {
      return ["bump:patch", true];
    }

    var versionType = bumpConfig.slice(11, -1);
    return ["bump:" + versionType, true];
  }

  /**
   * Task to tag and deploy the current state to git and npm.
   *
   * This task will take care of running other tasks in the right order, specified below:
   *     - clean:npm - Enabled by default, can be disabled with "disableClean".
   *     - test - Enabled by default, can be disabled with "disableTests".
   *     - run:babel - Will always run. This transplies the code down to es5.
   *     - bump:{versionType} - Enabled by default with the versionType being "patch". To specify a different type,
   *         use "enableBump(versionType)". To disable, use "disableBump".
   *     - package:npm - Will always run.
   *     - publish:npm - Enabled by default, can be disabled with "disablePublish".
   *
   * Below are some examples of how this task would run:
   *     - internal-deploy
   *       Will run the tasks "clean:npm", "test" "bump:patch", "copy:npm", "package:npm", and "publish:npm".
   *     - internal-deploy:disableClean:enableJsHint:enableBump(minor):disablePublish
   *       Will run the tasks "test", "bump:minor", "copy:npm", "package:npm"
   *     - internal-deploy:disableBump
   *       Will run the tasks "clean:npm", "copy:npm", "package:npm", "publish:npm".
   */
  grunt.registerTask(
    "internal-deploy",
    "Update the version number, create a tag for it, and push changes to git and npm.",
    function() {
      var flags = _.toArray(arguments),
        tasks = [
          ["clean:npm", !_.contains(flags, "disableClean")],
          ["test", !_.contains(flags, "disableTests")],
          ["run:babel", true],
          getBumpTaskConfigs(flags),
          ["package:npm", true],
          ["publish:npm", !_.contains(flags, "disablePublish")]
        ];

      _.each(tasks, function(taskConfigs) {
        var taskName = taskConfigs[0],
          shouldRun = taskConfigs[1];

        if (shouldRun) {
          grunt.task.run(taskName);
        }
      });
    }
  );

  grunt.registerTask(
    "deploy:dev",
    "Clean, verify JavaScript, update the pre-patch version number, create tag for it, and push to git & npm.",
    "internal-deploy:enableJsHint:enableBump(prepatch)"
  );
  grunt.registerTask(
    "deploy:major",
    "Clean, verify JavaScript, update the major version number, create tag for it, and push to git & npm.",
    "internal-deploy:enableBump(major)"
  );
  grunt.registerTask(
    "deploy:minor",
    "Clean, verify JavaScript, update the minor version number, create tag for it, and push to git & npm.",
    "internal-deploy:enableBump(minor)"
  );
  grunt.registerTask(
    "deploy:patch",
    "Clean, verify JavaScript, update the patch version number, create tag for it, and push to git & npm.",
    "internal-deploy"
  );

  // This task doesn't have any configurations
  return null;
};
