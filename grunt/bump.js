/**
 * This will increment the version number of the module and push the code to origin master
 * Usage: grunt bump:<major|minor|patch>
 */
module.exports = function(grunt, configs) {
  return {
    options: {
      tagName: "%VERSION%",
      pushTo: "origin HEAD"
    }
  };
};
