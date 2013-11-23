module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

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

    autoWatch: true,
    browsers: ['Chrome']
  });
};
