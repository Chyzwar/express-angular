module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['public/**/*.less'],
                tasks: ['concat:less', 'less'],
                options: {
                    nospawn: true
                },
            },
            scripts: {
                files: ['public/app/**/*.js'],
                tasks: ['concat:js'],
                options: {
                    interrupt: true
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true
                },
                files: {
                    // target.css file: source.less file
                    "public/dist/main.min.css": "public/dist/main.min.less"
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'public/**/*.css',
                        'public/**/*.jpg',
                        'public/**/*.png',
                        'public/**/*.gif',
                        'public/**/*.svg',
                        'public/**/*.js',
                        'public/**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    //I am hosting my projects using apache virtual hosts, I define ServerName and /etc/hosts
                    host: "localhost:3025",
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: "\n", //add a new line after each file
                    banner: "//Concatenated Angular App \n", //added before everything
                    footer: "//End of Angular App", //added after everything
                    sourceMap: true
                },
                src: [
                    'public/lib/angular/angular.min.js',
                    'public/lib/angular-route/angular-route.min.js',
                    'public/lib/angular-resource/angular-resource.min.js',
                    'public/lib/angular-messages/angular-messages.min.js',
                    'public/app/app.js',
                    // Main Application source files
                    'public/app/**/*.js',
                ],
                // the location of the resulting JS file
                dest: 'public/dist/app.min.js'
            },
            less: {
                src: [
                    'public/assets/css/main.less',
                    // Main Application less source files
                    'public/app/**/*.less',
                ],
                // the location of the resulting JS file
                dest: 'public/dist/main.min.less'
            }
        },
        removelogging: {
            dist: {
                src: '../public/javascripts/interaction.min.js',
                dest: '../public/javascripts/interaction.min.js'
            }
        },
        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src: 'public/css/main.min.css',
                dest: 'public/css/main.min.css'
            },
        },
    });
    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // create custom task-list

    grunt.registerTask('build', ["autoprefixer", "removelogging"]);
    grunt.registerTask('default', ["browserSync", "watch"]);


};
