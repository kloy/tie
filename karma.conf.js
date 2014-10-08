module.exports = function(config) {

  config.set({
    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/*.js',
      'test/*.spec.js'
    ],

    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
  });
};
