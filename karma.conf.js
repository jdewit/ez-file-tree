module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai'],

    reporters: ['progress', 'coverage'],

    files: [
      // libraries
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/ez-object2array/dist/ez-object2array.min.js',

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
