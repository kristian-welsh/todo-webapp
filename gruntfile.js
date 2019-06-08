module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Mocha for client side tests
		mocha: {
			all: {
				src: ['tests/testrunner.html']
			},
			options: {
				run: true,
			},
		},
		// Mocha for server side tests
		mochaTest: {
			test: {
				options: { },
				src: ['tests/**/*.js'],
			},
		},
		jshint: {
			all: {
				src: ['gruntfile.js', 'src/*.js', 'src/**/*.js', 'tests/**/*.js'],
			},
			options: {
				esversion: 8,
			},
		},
		run: {
			options: { },
			run_server: {
				cmd: 'node',
				args: [
					'src/application.js',
				],
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-run');

	grunt.registerTask('default', ['jshint', 'mochaTest']);
	grunt.registerTask('test', ['jshint', 'mochaTest']);
	grunt.registerTask('server', 'run');
};

