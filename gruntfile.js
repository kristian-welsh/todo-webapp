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
				src: ['tests/server/**/*.js'],
			},
		},
		jshint: {
			all: {
				src: ['gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
			},
			options: {
				esversion: 6,
			},
		},
		run: {
			options: { },
			run_server: {
				cmd: 'node',
				args: [
					'src/www/index.js',
				],
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint'); // file cleanup
	//grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test'); // server side tests
	grunt.loadNpmTasks('grunt-run'); // run cmd executables

	grunt.registerTask('default', ['jshint', 'mochaTest', 'run']);
};

