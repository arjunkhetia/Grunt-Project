module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: {
      'dist': ['dist']
    },
    copy: {
      main: {
        expand: true,
        src: 'app/index.html',
        dest: 'dist',
        flatten: true,
        filter: 'isFile',
        options: {
          process: function (content, srcpath) {
            return content.replace('style.css', 'style.min.css').replace('script.js', 'script.min.js');
          },
        },
      },
    },
    sass: {
      dist: {
        files: {
          'dist/stylesheets/style.css': 'app/stylesheets/style.scss'
        }
      }
    },
    cssmin: {
      build: {
        src: 'dist/stylesheets/style.css',
        dest: 'dist/stylesheets/style.min.css'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/javascripts/script.min.js': ['app/javascripts/script.js']
        }
      }
    },
    imagemin: {
        dynamic: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [{removeViewBox: false}]
            },
            files: [{
                expand: true,
                cwd: 'app/images',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/images'
            }]
        }
    },
    connect: {
        server: {
            options: {
                protocol: 'http', // 'http2' or 'https'
                port: 3000,
                hostname: '*',
                base: 'dist',
                open : true,
                livereload : true
            }
        }
    },
    watch: {
      copy: {
        files: 'app/index.html',
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: '**/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },
      uglify: {
        files: 'app/javascripts/script.js',
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      imagemin: {
        files: 'app/images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'sass', 'cssmin', 'uglify', 'imagemin', 'connect', 'watch']);
  grunt.registerTask('clear', ['clean']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('image', ['imagemin']);

};
