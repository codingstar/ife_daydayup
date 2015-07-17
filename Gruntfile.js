module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {  
            compile: {  
                files: {  
                    'css/daydayup.css':'develop/less/main.less'
                }
            }
        },
        cssmin:{  
            minify: {  
                expand: true,  
                src: ['css/daydayup.css'],  
                dest: '',  
                ext: '.min.css'  
            }  
        },  
        watch: {  
            css: {  
                files: ['develop/less/*.less'],  
                tasks: ['less','cssmin']  
            }  
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! Daydayup - v0.1 */'
            },
            dist: {
                src: ['develop/js/*.js'],
                dest: 'js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            release: {//任务四：合并压缩a.js和b.js
                files: {
                    'release/js/daydayup.min.js': ['develop/js/main.js']
                }
            }
        }
    });  
    grunt.loadNpmTasks('grunt-contrib-less');  
    grunt.loadNpmTasks('grunt-contrib-cssmin');  
    grunt.loadNpmTasks('grunt-contrib-watch');  
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less',"cssmin","watch","concat","uglify"]);  
};
