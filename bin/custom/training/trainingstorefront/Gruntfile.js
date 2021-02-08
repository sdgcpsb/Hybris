'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		},
		less: {
			default: {
				options: {
					paths: './web/webroot/WEB-INF/_ui-src/shared/less',
				},
				files: [
					{
						expand: true,
						cwd: 'web/webroot/WEB-INF/_ui-src/',
						src: [
							'**/themes/**/less/style.less',
							'**/themes/**/less/product.less',
							'**/themes/**/less/category.less',
							'**/themes/**/less/account.less',
							'**/themes/**/less/cart.less',
							'**/themes/**/less/storelocator.less',
							'**/themes/**/less/checkout.less',
							'!**/blue/**'
						],
						dest: 'web/webroot/_ui/',
						ext: '.css',
						rename:function(dest,src) {
							var nsrc = src.replace(new RegExp('/themes/(.*)/less'),'/theme-$1/css');
							return dest + nsrc;
						}
					}
				]
			},
			amp: {
	            options: {
		            paths: './web/webroot/WEB-INF/_ui-src/shared/amp-less',
	            },
				files: [
					{
						expand: true,
						cwd: 'web/webroot/WEB-INF/_ui-src/',
						src: '**/themes/**/amp-less/style.less',
						dest: 'web/webroot/WEB-INF/tags/responsive/amp/styles/',
						ext: '.tag',
						rename:function(dest,src) {
							var nsrc = /\/themes\/(.*)\/amp/.exec(src)[1];
							return dest + nsrc + '.tag';
						}
					}
				]
			}
		},
		cssmin: {
			options: {
				inline: false
			},
			minimize: {
				files: [{
					expand: true,
					cwd: 'web/webroot/_ui/responsive/',
					dest: 'web/webroot/_ui/responsive/',
					src: [
						'**/css/style.css',
						'**/css/product.css',
						'**/css/category.css',
						'**/css/account.css',
						'**/css/cart.css',
						'**/css/storelocator.css',
						'**/css/checkout.css'
					],
					ext: '.min.css'
				}]
			},
			minimize_amp: {
				files: [{
					expand: true,
					cwd: 'web/webroot/WEB-INF/tags/responsive/amp/styles',
					dest: 'web/webroot/WEB-INF/tags/responsive/amp/styles',
					src: ['*.tag'],
					ext: '.tag'
				}]
			}

	    },
		sync : {
			syncfonts: {
				files: [{
					expand: true,
					cwd: 'web/webroot/WEB-INF/_ui-src/',
					src: '**/themes/**/fonts/*/**',
					dest: 'web/webroot/_ui/',
					rename:function(dest,src) {
						var nsrc = src.replace(new RegExp('/themes/(.*)'),'/theme-$1');
						return dest + nsrc;
					}
				}]
			},
			sync_JavaScript_Libraries: {
				files: [{
					cwd: 'web/webroot/WEB-INF/_ui-src/shared/js/libs',
					src: '*.js',
					dest: 'web/webroot/_ui/shared/js/libs',
					updateAndDelete: true
				}]
			}
		}
	});

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	
	// Default task(s). (this is the hybris default grunt task)
	grunt.registerTask('default', ['less', 'sync']);

	// Configure Grunt with FED customizations
	//require('./web/webroot/WEB-INF/_ui-src/responsive/custom/grunt/fed-grunt-customizer')(grunt);

	// First run our test task, then our build task, and then our watch task
	//grunt.registerTask('default', ['test', 'build', 'watch']);
	//grunt.registerTask('default',['build']);

};
