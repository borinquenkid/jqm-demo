module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.initConfig({

            connect: {
                server: {
                    options: {
                        hostname: '*',
                        port: 9001,
                        base: '.',
                        keepalive: true
                    }
                }
            },
            mochacli: {
                options: {
                    files: 'test/jqm-demo-override-builder.js',
                    reporter: 'spec'
                },
                iPhone: {
                    options: {
                    	files: 'test/jqm-demo-override-builder.js',
                        reporter: 'spec',
                        verbose: true,
                        grep: 'iPhone'
                    }
                },
                android: {
                    options: {
                    	files: 'test/jqm-demo-override-builder.js',
                        reporter: 'spec',
                        verbose: true,
                        grep: 'android'
                    }
                },
                chrome: {
                    options: {
                    	files: 'test/jqm-demo-override-builder.js',
                        reporter: 'spec',
                        verbose: true,
                        grep: 'chrome'
                    }
                }
            }

        }

    );
    grunt.registerTask('test-iPhone', ['mochacli:iPhone']);
    grunt.registerTask('test-android', ['mochacli:android']);
    grunt.registerTask('test-chrome', ['mochacli:chrome']);
};
