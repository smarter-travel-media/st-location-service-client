/**
 * Deletes specified files
 * Usage: grunt clean
 */
module.exports = function(grunt, configs) {
  return {
    npm: ["<%= dirs.npm %>"]
  };
};
