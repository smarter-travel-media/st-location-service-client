module.exports = function (config) {
  config.set({
    browsers: [ "PhantomJS_noSecurity" ],
    singleRun: true, //just run once by default
    frameworks: [ "mocha", "browserify"], //use the mocha test framework
    files: [
      "test/util/*.js",
      "test/itest/**/*.js",
      "test/itest/**/*.jsx"
    ],
    preprocessors: {
      "test/**/*.js": [ "browserify" ],//transpile the source for testing
      "test/**/*.jsx": [ "browserify" ]
    },
    browserify: {
      debug: true,
      transform: [ "babelify"],
      extensions: [".js", ".jsx"]
    },
    reporters: [ "mocha"],//report results in this format
    coverageReporter: {
      type: "text"
    },
    client: {
      args: [process.env.LOCATION_SERVICE_URL]
    },
    customLaunchers: {
      PhantomJS_noSecurity: {
        base: 'PhantomJS',
        flags: [
          '--web-security=false'
        ]
      }
    }
  });
};
