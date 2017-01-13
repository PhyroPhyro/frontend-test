module.exports = function(grunt) {

  grunt.initConfig({
	lint: {
        all:['public/**/*.js']
    },
    watch: {
		options:{livereload:true},
      files: ['public/**/*'],
      tasks: ['sass']
    },
	sass: {
	    dist: {
	        options: {                       // Target options
	            style: 'expanded',
	        },
	        files: [{
	            expand: true,
	            cwd: 'public/stylesheets',
	            src: ['**/*.scss'],
	            dest: 'public/stylesheets',
	            ext: '.css'
	        }]
	    }
    },
	express: {
		dev:{
			options: {
				port:7007,
				hostname:'localhost',
				bases:['.'],
			  script: 'app.js',
			  livereload: true
		  }
		}
	  }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['sass:dist','express:dev','watch']);
};