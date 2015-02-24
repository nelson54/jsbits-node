module.exports = function(grunt) {
    
    /*var path = require('path');
    var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
    var folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };*/

    // Project configuration.
    grunt.initConfig({
        /*template: {
            dev: {
                dest: 'build/index.html',
                src: 'source/index.jade',
                variables: {
                    stylesheet: "css",//grunt.file.read('build/style.css'),
                    javascript: "javascript"//grunt.file.read('build/app.js')
                }
            }   
        },*/
        jade: {
          compile: {
            options: {
              data: {
                stylesheet: "",//grunt.file.read('build/style.css'),
                javascript1: "",//grunt.file.read('build/static/scriptText/StabWound.txt'),
                javascript2: "",//grunt.file.read('build/static/scriptText/BigMoney.txt')
              }
            },
            files: {
              "build/dist/index.html": "source/index.jade"
            }
          }
        },
        less: {
            development: {
                options: {
                    yuicompress: true
                    //paths: ["source/styles/"]
                },
                files: {
                    "build/temp/style.css": "source/styles/style.less"
                }
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                    'build/dist/style.css': ['build/temp/style.css'],
                    'build/dist/app.js': ['source/lib/vendor/ender.min.js', 'source/lib/vendor/hilight.min.js', 'source/lib/app.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'build/static/', src: ['**'], dest: 'build/dist/'}
                ]
            }
        },
        /*livereload: {
            port: 35729 // Default livereload listening port.
        },*/
        connect: {
              server: {
                    options: {
                            port: 9001,
                            base: 'build/dist/',
                            hostname: '*'
                    }
              }
        },
        watch: {
           scripts: {
                files: ['source/**/*', 'build/static/**/*'],
                tasks: ['less:development', 'concat', 'jade'],
                options: {
                    nospawn: true
                }
           }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-livereload');

    // Default task(s).
    grunt.registerTask('default', ['less:development', 'concat', 'jade', 'copy', 'connect', 'watch']);

};
