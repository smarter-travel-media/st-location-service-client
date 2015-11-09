/**
 * Like jshint but cooler
 */
module.exports = function(grunt, configs) {
  return {
    options: {
        cofig: ".eslintrc"
    },

    files: {
        src: ["<%= dirs.src %>/**/*.js", "<%= dirs.src %>/**/*.jsx"]
    }
  };
};
