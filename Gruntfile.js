module.exports = function(grunt) {

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
                javascript: ""//grunt.file.read('build/app.js'),
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
                    'build/dist/style.css': ['build/temp/style.css','source/styles/hljs-github.css','source/styles/jquery.tweet.css'],
                    'build/dist/app.js': ['source/lib/vendor/hilight.min.js', 'source/lib/vendor/jquery.tweet.js', 'source/lib/app.js']
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
        connect: {
              server: {
                    options: {
                          port: 9001,
                          base: 'build/dist/',
                          hostname: '*',
                          keepalive:true
                    }
              }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['less:development', 'concat', 'jade', 'copy', 'connect']);

};
