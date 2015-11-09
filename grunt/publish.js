/**
 * Puplishes the specified directory to npm
 */
module.exports = function(grunt, configs) {
  return {
    npm: {
      src: "<%= dirs.npm %>"
    }
  };
};
