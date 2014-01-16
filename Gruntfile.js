'use_strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json']
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      src: {
        options: {
          node: true,
          globals: {
            it: true,
            beforeEach: true,
            expect: true,
            element: true,
            browser: true,
            module: true,
            spyOn: true,
            inject: true,
            repeater: true,
            describe: true,
            angular: true,
            jQuery: true
          }
        },
        files: {
          src: ['src/**/*.js', 'spec/**/*.js']
        },
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      singleRun: {
        configFile: 'karma.conf.js',
        background: false,
        singleRun: true
      }
    },
    less: {
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          "dist/ez-file-tree.min.css": "src/less/ez-file-tree.less"
        }
      }
    },
    ngtemplates:  {
      ezFileTree:      {
        src:      'src/template/*.html',
        dest:     'dist/ez-file-tree.tpl.js',
        options: {
          module: 'ez.fileTree',
          url: function(url) { return url.replace('src/template/', ''); }
        }
      }
    },
    shell: {
      clearCoverage: {
        command: 'rm -rf spec/coverage/*'
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true
      },
      dist: {
        files: {
          'dist/ez-file-tree.min.js': ['src/js/**/*.js']
        }
      }
    },
    watch: {
      dev: {
        files: ['src/**/*', 'spec/*Spec.js'],
        tasks: ['default'],
        options: {
          livereload: 9090,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'uglify', 'less', 'karma:unit:run']);

  grunt.registerTask('dev', ['karma:unit:start', 'shell:clearCoverage', 'watch']);

  grunt.registerTask('test', ['shell:clearCoverage', 'karma:singleRun']);
};
