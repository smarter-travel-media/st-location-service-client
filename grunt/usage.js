/**
 * This contains the list of so called "Public Tasks". These are the only tasks that can be used on the command line
 * because it has been confirmed that the following tasks will execute in the right order a prerequisite list of other
 * tasks.
 */
var chalk = require("chalk");

module.exports = function(grunt, configs) {
  return {
    options: {
      title: chalk.bold.underline("<%= package.name %>"),
      description: "<%= package.description %>",
      taskGroups: [
        {
          header: chalk.bold("Development"),
          tasks: ["test", "watch", "eslint", "run:test"]
        },
        {
          header: chalk.bold("Deployment"),
          tasks: ["deploy:dev", "deploy:patch", "deploy:minor", "deploy:major"]
        }
      ],
      taskDescriptionOverrides: {
        "test": "runs eslint and unit tests",
        "eslint": "Verify that the JavaScript code passes Eslint validation.",
        "run:test": "Run the unit tests",
        "watch": "Watchs for file changes and runs quality checks on code"
      }
    }
  };
};
