/**
 * Adding hooks into the npm tests.
 */
module.exports = function(grunt, configs) {
  return {
    test: {
      cmd: "npm",
      args: ["test"]
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
