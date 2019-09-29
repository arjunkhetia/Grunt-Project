# Grunt Project   ![Version][version-image]

![Linux Build][linuxbuild-image]
![Windows Build][windowsbuild-image]
![NSP Status][nspstatus-image]
![Test Coverage][coverage-image]
![Dependency Status][dependency-image]
![devDependencies Status][devdependency-image]

The quickest way to get started with Grunt - The JavaScript Task Runner, just clone the project:

```bash
$ git clone https://github.com/arjunkhetia/Grunt-Project.git
```

First we have to install the grunt command line utility:

```bash
$ npm install --global grunt-cli
```

Install dependencies:

```bash
$ npm install
```

To execute the application run:

```bash
$ grunt
```

The app will automatically start on `http://localhost:3000/`:

# Grunt

Grunt is a JavaScript task runner, a tool used to automatically perform frequent tasks such as minification, compilation, unit testing, and linting.

## Grunt-SASS

Grunt SASS compiles Sass files into CSS files and also minifies CSS files.

```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.initConfig({
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
    watch: {
      sass: {
        files: '**/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.registerTask('css', ['sass', 'cssmin']);
};
```

## Grunt-JS

Grunt used for concatenates (combines) multiple JS files into one large file and also minifies JS files.

```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'dist/javascripts/script.min.js': ['app/javascripts/script.js']
        }
      }
    },
    watch: {
      uglify: {
        files: 'app/javascripts/script.js',
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.registerTask('js', ['uglify']);
};
```

## Grunt-Image

Grunt used for compressing the image files.

```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.initConfig({
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
    watch: {
      imagemin: {
        files: 'app/images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.registerTask('image', ['imagemin']);
};
```

## Grunt-Connect (LiveReload)

Grunt used for live reloading the page in all browsers, whenever files are changed.

```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.initConfig({
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
      all: {
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.registerTask('default', ['connect', 'watch']);
};
```

## Grunt-Clean

Unnecessary files should be deleted before running the grunt build process.

```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    clean: {
      'dist': ['dist']
    },
  });
  grunt.registerTask('clear', ['clean']);
};
```

[version-image]: https://img.shields.io/badge/Version-1.0.0-orange.svg
[linuxbuild-image]: https://img.shields.io/badge/Linux-passing-brightgreen.svg
[windowsbuild-image]: https://img.shields.io/badge/Windows-passing-brightgreen.svg
[nspstatus-image]: https://img.shields.io/badge/nsp-no_known_vulns-blue.svg
[coverage-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[dependency-image]: https://img.shields.io/badge/dependencies-up_to_date-brightgreen.svg
[devdependency-image]: https://img.shields.io/badge/devdependencies-up_to_date-yellow.svg
