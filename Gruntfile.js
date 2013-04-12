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
                stylesheet: grunt.file.read('build/style.css'),
                javascript: grunt.file.read('build/app.js'),
              }
            },
            files: {
              "build/index.html": "source/index.jade"
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
                    "source/styles/style.css": "source/styles/style.less"
                }
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                    'build/style.css': ['source/styles/style.css','source/styles/hljs-github.css','source/styles/jquery.tweet.css'],
                    'build/app.js': ['source/lib/vendor/hilight.min.js', 'source/lib/vendor/jquery.tweet.js', 'source/lib/app.js']
                }
            }
        },
        connect: {
              server: {
                    options: {
                          port: 9001,
                          base: 'build/',
                          hostname: '*',
                          keepalive:true
                    }
              }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['less:development', 'concat', 'jade', 'connect']);

};
