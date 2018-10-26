module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),


	// JsHint your javascript
	jshint : {
		src: {
			src: ['js/*.js', '!js/lib/*.js']
		},
		options : {
			browser: true,
			curly: false,
			eqeqeq: false,
			eqnull: true,
			expr: true,
			immed: true,
			newcap: true,
			noarg: true,
			smarttabs: true,
			sub: true,
			undef: false
		}
	},

	concat: {
	// 2. la configuration pour la concaténation va ici.
		dev: {
			src: [
			'src/js/*.js', '!src/js/lib/*.js' //'src/js/vendor/**/*.js', 'src/js/main.js'
			],
			dest: 'dist/js/global.js'
		}
	},

	uglify: {
		production: {
			options: {
				mangle: false,
				sourceMap: true,
				sourceMapName: 'dist/js/app.map'
			},
			files: {
				'dist/global.js': ['src/js/*.js', '!src/js/lib/*.js'] //['js/vendor/**/*.js', 'js/main.js']
			}
		}
	},

	imagemin: {
		production: {
			files: [{
				expand: true,
				cwd: 'src/images/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'dist/images/'
			}]
		}
	},

	svgmin: {
		production : {
			files: [{
				expand: true,
				cwd: 'src/images',
				src: '**/*.svg',
				dest: 'dist/images/'
			}]
		}
	},

	copy: {
		fonts: {
			expand: true,
			cwd: 'src/fonts',
			src: '**/*',
			dest: 'dist/fonts',
			flatten: true
		},
		jslibs: {
			expand: true,
			cwd: 'src/js/lib',
			src: '**/*',
			dest: 'dist/js/lib',
			//flatten: true
		},
		images: {			
			expand: true,
			cwd: 'src/images',
			src: '**/*',
			dest: 'dist/images',
			flatten: true
		}
	},

	// Compass and scss
	compass: {
		options: {
		//bundleExec: true,
		httpPath: './',
		cssDir: 'dist/css',
		sassDir: 'src/scss',
		imagesDir: 'src/images',
		javascriptsDir: 'src/js',
		fontsDir: 'src/fonts',
		assetCacheBuster: 'none',
		require: [
			//'sass-globbing',
			'susy'
			]
		},
		dev: {
			options: {
				environment: 'development',
				outputStyle: 'expanded',
				relativeAssets: true,
				raw: 'line_numbers = :true\n'
			}
		},
		dist: {
			options: {
				environment: 'production',
				outputStyle: 'compact',
				force: true
			}
		}
	},

	watch: {
		compass: {
			files: ['src/scss/*.{scss,sass}'],
			tasks: ['compass:dev']
		},
		scripts: {
			files: ['src/js/*.js', '!src/js/lib/*.js'],
			tasks: ['concat'],
			options: {
				spawn: false
			}
		},
		php: {
		  files: [ '*.php', '**/*.php' ],
		  options: {
		    reload: true
		  }
		},
		 
		copyfonts: {
			files: ['src/fonts/*'],
			tasks: ['copy:fonts']
		},
		 
		copyjslibs: {
			files: ['src/js/lib/*.js'],
			tasks: ['copy:jslibs']
		},
		 
		copyimages: {
			files: ['src/images/*'],
			tasks: ['copy:images'],
			options: {
				spawn: false,
			}
		},

		options: {
			livereload: true,
		}
	},

	browserSync: {
		dev: {
			bsFiles: {
				src : [
				'dist/css/*.css',
				'*.php', 'inc/*.php'
				]
			},
			options: {
                    proxy: "http://localhost/Site-SEB/03-Site/WP/",//"local.dev",
                    //port: 8888,
                    watchTask: true
				}
		}
	}

});

// 3. Nous disons à Grunt que nous voulons utiliser ce plug-in.
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-svgmin');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');


// 4. Nous disons à Grunt quoi faire lorsque nous tapons "grunt" dans la console.
grunt.registerTask('default', ['browserSync', 'watch']);
grunt.registerTask('dev', ['watch']);
grunt.registerTask('dist', ['jshint', 'uglify', 'compass:dist', 'copy', 'imagemin:production', 'svgmin:production']);




};