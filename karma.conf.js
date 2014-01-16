module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    reporters: ['progress', 'coverage'],

    files: [
      // libraries
      'bower_components/jquery/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // our app
      'src/js/ez-file-tree.js',
      'dist/ez-file-tree.tpl.js',

      // tests
      'spec/*Spec.js',
    ],

    preprocessors: {
      'src/js/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'spec/coverage/'
    },

    port: 1429,

    browsers: ['Chrome']
  });
};
