module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
			less: {
				files: [
					'web/webroot/WEB-INF/_ui-src/shared/less/variableMapping.less',
					'web/webroot/WEB-INF/_ui-src/shared/less/generatedVariables.less',
					'web/webroot/WEB-INF/_ui-src/**/themes/**/less/variables.less',
					'web/webroot/WEB-INF/_ui-src/**/themes/**/less/style.less',
					'web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-*/less/*'
				],
				tasks: ['less'],
				options: {
					atBegin: true
				}
			},
			fonts: {
				files: ['web/webroot/WEB-INF/_ui-src/**/themes/**/fonts/**/*'],
				tasks: ['sync:syncfonts'],
				options: {
					atBegin: true
				}
			},
			app : {
				files : ['web/webroot/WEB-INF/_ui-src/shared/js/**/*.js'],
				tasks: ['jshint:test','sync:sync_JavaScript_Libraries','uglify'],
				options: {
					atBegin: true
				}
			}
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('default', ['test', 'build']);

};
