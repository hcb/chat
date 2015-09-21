module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    vars: {
      path: {
          src: 'src',
          dist: 'dist',
          server: 'server',
          client: 'client'
      }
    },

    // Dev tasks
    // jshint, nodemon, sass [dev], watch, etc.
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '**/*.scss'],
      tasks: ['jshint', 'sass']
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= vars.path.src %>/client/css/main.css': '<%= vars.path.src %>/client/css/sass/*.scss'
        }
      }
    },
    copy: {
      dev: {
        files: {
          '<%= vars.path.src %>/<%= vars.path.client %>/lib/normalize.css': 'node_modules/normalize.css/normalize.css'
        }
      }
    }
    // Build tasks
    // This is where uglify, concat, and other things like that will go
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-copy');

  grunt.registerTask('dev', ['copy:dev', 'jshint', 'watch', 'sass']);
  // grunt.registerTask('default', ['jshint']);

};
