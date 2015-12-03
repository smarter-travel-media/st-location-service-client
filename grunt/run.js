/**
 * Adding hooks into the npm tests.
 */
module.exports = function(grunt, configs) {
  return {
    test: {
      cmd: "npm",
      args: ["test"]
    },
    itest: {
      cmd: "npm",
      args: ["run", "karma-itest"]
    },
    babel: {
      cmd: "npm",
      args: ["run", "compile"]
    },
    docs: {
      cmd: "npm",
      args: ["run", "docs"]
    }
  };
};
