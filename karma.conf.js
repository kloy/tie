module.exports = function(config) {

  config.set({
    // Frameworks to use
    frameworks: ['jasmine', 'browserify'],

    // List of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/*.spec.js'
    ],

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      'test/*.spec.js' : ['browserify']
    },

    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],

    browserify: {
      // extensions: ['.coffee'],
      // ignore: [],
      // transform: ['coffeeify'],
      debug: true,
      // noParse: ['jquery'],
      watch: true,
    },
  });
};
