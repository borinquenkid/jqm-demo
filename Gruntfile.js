module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({

            connect: {
                server: {
                    options: {
                    	hostname:'*',
                        port: 9001,
                        base: '.',
                        keepalive : true
                    }
                }
            }

  
        }


    );

}
;