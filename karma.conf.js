module.exports = function (config) {
  var istanbul = require('browserify-istanbul');
  config.set({
    browsers: [ "PhantomJS" ],
    singleRun: true, //just run once by default
    frameworks: [ "mocha", "browserify"], //use the mocha test framework
    files: [
      "test/util/shim.js",
      "test/**/*.js",
      "test/**/*.jsx"
    ],
    preprocessors: {
      "test/**/*.js": [ "browserify" ],//transpile the source for testing
      "test/**/*.jsx": [ "browserify" ]
    },
    browserify: {
      debug: true,
      transform: [ "babelify", istanbul({})],
      extensions: [".js", ".jsx"]
    },
    reporters: [ "mocha", "coverage" ],//report results in this format
    coverageReporter: {
      type: "text"
    }
  });
};
