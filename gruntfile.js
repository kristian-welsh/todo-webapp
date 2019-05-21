module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Mocha
		mocha: {
			all: {
				src: ['tests/testrunner.html']
			},
			options: {
				run: true,
				growlOnSuccess: false,
			},
		},
		jshint: {
			all: {
				src: ['gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['jshint', 'mocha']);
};

