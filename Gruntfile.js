"use strict";

var path = require("path");

module.exports = function(grunt) {
  var configs = {};

  // Path configurations
  configs.dirs = {
    src: path.join(__dirname, "src"),
    npm: path.join(__dirname, "npm")
  };

  // -------------------------------------------------------------------------------------------------------------- //

  // Record the time it takes to execute various tasks
  require("time-grunt")(grunt);

  // Allow for splitting the grunt configurations into multiple files
  require("load-grunt-config")(grunt, {
    data: configs,
    jitGrunt: true
  });
};
