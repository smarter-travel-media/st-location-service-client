/**
 * The env grunt task allows for system variables to be set for different tasks.
 */
module.exports = function(grunt, configs) {
  return {
    test: {
      NODE_ENV: "development",
      LOCATION_SERVICE_URL: grunt.option("svc_url")
    },
    build: {
      NODE_ENV: "production"
    }
  };
};
