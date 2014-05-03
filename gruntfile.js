//Gruntfile for the TemplateX Project

var TITLE							= "TemplateX",				// Title
		LANGUAGE					= "ru",								// Language
		DEVELOPMENT				= "dev",							// Development Directory
		IMAGES						= "images",						// Images
		META							= "meta",							// Meta Images
		TEMPLATES					= "templates",				// Templates
		CSS_TEMPLATE			= "_head.html",				// Template Containing CSS Declarations
		JS_TEMPLATE				= "_scripts.html",		// Template Containing JavaScript Declarations
		RESOURCES					= "res",							// Project Resources
		IMAGE_RESOURCES		= "images",						// Image Resources
		DATA_URI					= [],									// List of Images (Relative to the Image Resources Directory) to Convert to DataURI
		SASS							= "sass-dev",					// Sass
		CSS_DEV						= "css-dev",					// Generated CSS
		CSS								= "css",							// Production CSS
		CSS_FILENAME			= "styles",						// Production CSS Filename
		JS_DEV						= "js-dev",						// JavaScript
		JS								= "js",								// Production JavaScript
		JS_FILENAME				= "scripts",					// Production JavaScript Filename
		BUILD							= "build",						// Project Build
		BUILD_COPY				= "build";						// Shared Copy of the Build

function fillAnArray(ARRAY, PATH) {
	var RESULT = [];
	for (var ELEMENT in ARRAY) {
		RESULT.push(PATH + ARRAY[ELEMENT]);
	}
	return RESULT;
}

var project = {
	init: function() {
		this.title = TITLE;
		this.language = LANGUAGE;
		this.dir = DEVELOPMENT + "/";
		this.images = this.dir + IMAGES + "/";
		this.meta = META;
		var TEMPLATES_DIR = this.dir + TEMPLATES + "/",
				RESOURCES_DIR = this.dir + RESOURCES + "/";
		this.templates = {
			dir: TEMPLATES_DIR,
			css: TEMPLATES_DIR + CSS_TEMPLATE,
			js: TEMPLATES_DIR + JS_TEMPLATE,
		};
		this.res = {
			dir: RESOURCES_DIR + "/",
			images: {
				dir: RESOURCES_DIR + IMAGE_RESOURCES + "/",
				dataURI: fillAnArray(DATA_URI, RESOURCES_DIR + IMAGE_RESOURCES + "/")
			},
			css: {
				dir: RESOURCES_DIR + CSS + "/",
				devDir: RESOURCES_DIR + CSS_DEV + "/",
				sass: RESOURCES_DIR + SASS + "/",
				filename: CSS_FILENAME
			},
			js: {
				dir: RESOURCES_DIR + JS + "/",
				devDir: RESOURCES_DIR + JS_DEV + "/",
				filename: JS_FILENAME
			}
		};
		this.build = {
			dir: BUILD + "/",
			copyDir: BUILD_COPY + "/"
		};
		return this;
	}
}.init();

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		
		pkg: grunt.file.readJSON("package.json"),

		buildEnv: grunt.file.readJSON(process.env.buildJSON),

		datauri: {
			resImages: {
				options: {
					classPrefix: "image-"
				},
				src: project.res.images.dataURI,
				dest: project.res.css.sass + "tx/_tx-projectImages-base64.scss"
			}
		},

		htmlhint: {
			htmlHint: {
				options: {
					"tagname-lowercase": true,
					"attr-lowercase": true,
					"attr-value-double-quotes": true,
					"doctype-first": true,
					"tag-pair": true,
					"spec-char-escape": true,
					"id-unique": true,
					"src-not-empty": true,
					"id-class-value": true,
					"style-disabled": true,
					"img-alt-require": true
				},
				cwd: project.dir,
				src: ["*.html"],
				expand: true,
				flatten: true
			}
		},
		jshint: {
			jsHint: {
				options: {
					"evil": true,
					"regexdash": true,
					"browser": true,
					"wsh": true,
					"trailing": true,
					"sub": true
				},
				cwd: project.res.js.devDir,
				src: ["*.js"],
				expand: true,
				flatten: true
			}
		},
		csslint: {
			cssLint: {
				options: {
					"adjoining-classes": false,
					"box-model": false,
					"box-sizing": false,
					"compatible-vendor-prefixes": "warning",
					"display-property-grouping": true,
					"duplicate-background-images": false,
					"duplicate-properties": true,
					"empty-rules": true,
					"errors": true,
					"fallback-colors": false,
					"floats": "warning",
					"font-faces": "warning",
					"font-sizes": "warning",
					"gradients": "warning",
					"ids": "warning",
					"import": "warning",
					"important": "warning",
					"known-properties": true,
					"outline-none": "warning",
					"overqualified-elements": "warning",
					"qualified-headings": "warning",
					"regex-selectors": "warning",
					"rules-count": "warning",
					"shorthand": "warning",
					"star-property-hack": "warning",
					"text-indent": "warning",
					"underscore-property-hack": "warning",
					"unique-headings": "warning",
					"universal-selector": "warning",
					"vendor-prefix": true,
					"zero-units": false
				},
				cwd: project.res.css.devDir,
				src: ["*.css"],
				expand: true,
				flatten: true
			}
		},
		yslow: {
			options: {
				thresholds: {
					weight: 180,
					speed: 1000,
					score: 80,
					requests: 15
				}
			},
			pages: {
				files: [
					{
						src: "http://localhost:8000"
					}
				]
			}
		},

		sass: {
			options: {
				sourceComments: "map"
			},
			generateCSS: {
				cwd: project.res.css.sass,
				src: ["**/*.scss", "**/*.sass", "!**/_*.scss", "!**/_*.sass"],
				dest: project.res.css.devDir,
				ext: ".css",
				expand: true
			}
		},
		autoprefixer: {
			options: {
				browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Explorer >= 7"]
			},
			prefixCSS: {
				cwd: project.res.css.devDir,
				src: ["**/*.css"],
				dest: project.res.css.devDir,
				expand: true
			}
		},

		concat: {
			datauri: {
				options: {
					separator: "\n\n"
				},
				src: [project.res.css.sass + "tx/_tx-projectImages-base64.scss", project.res.css.sass + "tx/_tx-projectImages-IE.scss"],
				dest: project.res.css.sass + "tx/_tx-projectImages.scss",
			},
			js: {
				options: {
					separator: "\n\n"
				},
				src: "<%= TASK.JS_ARRAY %>",
				dest: project.res.js.dir + project.res.js.filename + ".js",
			},
			css: {
				options: {
					separator: "\n"
				},
				src: "<%= TASK.CSS_ARRAY %>",
				dest: project.res.css.dir + project.res.css.filename + ".css"
			},
			cssIE: {
				options: {
					separator: "\n"
				},
				src: "<%= TASK.CSS_IE_ARRAY %>",
				dest: project.res.css.dir + project.res.css.filename + "-IE.css"
			}
		},

		"string-replace": {
			sassDebug: {
				options: {
					replacements: [{
						pattern: /\/\*# sourceMappingURL(.|\t|\s|\n)*?\*\/|.media \-sass\-debug\-info(.|\t|\s|\n)*?\}\}/gi,
						replacement: ""
					}]
				},
				files: {
					"./": [project.res.css.dir + "*.css"],
				}
			},
			build: {
				files: {
					"./": [project.build.dir + "*.html"],
				},
				options: {
					replacements: [{
						pattern: /@tx-title/gi,
						replacement: project.title
					},{
						pattern: /@tx-language/gi,
						replacement: project.language
					},{
						pattern: /.!-- @tx-css -->(.|\t|\s|\n)*?!-- \/@tx-css -->/gi,
						replacement: {
							checkIE: function() {
								var cssfiles;
								if (grunt.file.exists(project.res.css.dir + project.res.css.filename + "-IE.css")) {
									cssfiles = '<link rel="stylesheet" type="text/css" href="' + project.res.css.dir.replace(project.dir, "") + project.res.css.filename + '.min.css">\n\t\t<!--[if lte IE 7]> <link rel="stylesheet" type="text/css" href="' + project.res.css.dir.replace(project.dir, "") + project.res.css.filename + '-IE.min.css"> <![endif]-->';
								} else {
									cssfiles = '<link rel="stylesheet" type="text/css" href="' + project.res.css.dir.replace(project.dir, "") + project.res.css.filename + '.min.css">';
								}
								return cssfiles;
							}
						}.checkIE()
					},{
						pattern: /.!-- @tx-js -->(.|\t|\s|\n)*?!-- \/@tx-js -->/gi,
						replacement: '<script type="text/javascript" src="' + project.res.js.dir.replace(project.dir, "") + project.res.js.filename + '.min.js"></script>'
					}]
				}
			}
		},

		removelogging: {
			jsClean: {
				cwd: project.res.js.dir,
				src: ["*.js"],
				dest: project.res.js.dir,
				expand: true,
				flatten: true
			},
			jsDevClean: {
				cwd: project.res.js.dev,
				src: ["*.js"],
				dest: project.res.js.dev,
				expand: true,
				flatten: true
			}
		},
		uglify: {
			options: {
				preserveComments: false
			},
			jsMin: {
				cwd: project.res.js.dir,
				src: ["*.js"],
				dest: project.res.js.dir,
				ext: ".min.js",
				expand: true,
				flatten: true
			}
		},

		csscomb: {
			options: {
				config: "csscombConfig.json"
			},
			cssSortBuild: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				expand: true,
				flatten: true
			},
			cssSortDev: {
				cwd: project.res.css.devDir,
				src: ["*.css"],
				dest: project.res.css.devDir,
				expand: true,
				flatten: true
			}
		},
		cssc: {
			options: {
					consolidateViaSelectors: true
			},
			cssOptimize: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				ext: ".min.css",
				expand: true,
				flatten: true
			}
		},
		uncss: {
			cssOptimize: {
				files: {
					cssMinFiles: function() {
						var cssMinFilesObject = {};
						cssMinFilesObject[project.res.css.dir + project.res.css.filename + ".min.css"] = project.dir + "*.html";
						return cssMinFilesObject;
					}
				}.cssMinFiles()
			}
		},
		cssmin: {
			cssMin: {
				cwd: project.res.css.dir,
				src: ["*.min.css"],
				dest: project.res.css.dir,
				expand: true,
				flatten: true
			}
		},

		processhtml: {
			options: {
				includeBase: project.templates.dir,
				commentMarker: "@tx-process",
				recursive: true,
			},
			templates: {
				cwd: project.templates.dir,
				src: ["*.tmp.html", "!_*.html"],
				dest: project.dir,
				expand: true,
				ext: ".html"
			}
		},

		htmlmin: {
			cleanup: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true
				},
				cwd: project.build.dir,
				src: ["*.html", "!*.min.html"],
				dest: project.build.dir,
				expand: true
			},
			minify: {
				options: {
					collapseWhitespace: true,
					removeAttributeQuotes: true,
				},
				cwd: project.build.dir,
				src: ["*.html", "!_*.html", "!*.min.html"],
				dest: project.build.dir,
				ext: ".min.html",
				expand: true
			}
		},

		clean: {
			res: [project.res.css.dir + "*.css", project.res.js.dir + "*.js"],
			build: [project.build.dir]
		},
		copy: {
			build: {
				cwd: project.dir,
				src: ["**", "!**/tx-*.*", "!**/templates/**", "!**/**-dev/**", "!**/tx/**"],
				dest: project.build.dir,
				expand: true
			},
			meta: {
				cwd: project.meta,
				src: ["**/*.{ico,png,jpg,gif,txt}"],
				dest: project.build.dir,
				expand: true,
				flatten: true
			},
			share: {
				cwd: project.build.dir,
				src: ["**"],
				dest: "<%= buildEnv.shareRoot %>" + project.build.copyDir,
				expand: true
			}
		},

		imagemin: {
			images: {
				cwd: project.images,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.images,
				expand: true,
				options: {
					cache: false
				}
			},
			res: {
				cwd: project.res.images.dir,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.res.images.dir,
				expand: true,
				options: {
					cache: false
				}
			},
			meta: {
				cwd: project.meta,
				src: ["*.{png,jpg,gif}"],
				dest: project.meta,
				expand: true,
				options: {
					cache: false
				}
			}
		},
		imageoptim: {
			images: {
				options: {
					jpegMini: true,
					quitAfter: true
				},
				cwd: project.images,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.images,
				expand: true
			},
			res: {
				options: {
					jpegMini: true,
					quitAfter: true
				},
				cwd: project.res.images.dir,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.res.images.dir,
				expand: true
			},
			meta: {
				options: {
					jpegMini: true,
					imageAlpha: true,
					quitAfter: true
				},
				cwd: project.meta,
				src: ["*.{png,jpg,gif}"],
				dest: project.meta,
				expand: true
			}
		},
		svgmin: {
			svg: {
				cwd: project.res.images.dir,
				src: ["**/*.svg"],
				dest: project.res.images.dir,
				expand: true,
			}
		},

		compress: {
			gzip: {
				options: {
					mode: "gzip",
				},
				cwd: project.build.dir,
				src: ["**/*.min.js", "**/*.min.css",],
				dest: project.build.dir,
				expand: true
			},
			build: {
				options: {
					mode: "zip",
					archive: project.title + ".build.zip"
				},
				cwd: project.build.dir,
				src: ["**"],
				dest: ".",
				expand: true
			}
		},

		watch: {
			htmlTemplates: {
				files: [project.templates.dir + "*.html"],
				tasks: ["processhtml"]
			},
			sassStyles: {
				files: [project.res.css.sass + "**/*.scss", project.res.css.sass + "**/*.sass", "!" + project.res.css.sass + "**/_*.scss", "!" + project.res.css.sass + "**/_*.sass"],
				tasks: ["newer:sass", "newer:autoprefixer"]
			},
			sassPartials: {
				files: [project.res.css.sass + "**/_*.scss", project.res.css.sass + "**/_*.sass"],
				tasks: ["sass", "newer:autoprefixer"]
			},
			livereloadWatch: {
				options: {
					livereload: true
				},
				files: [project.dir + "*.html", project.res.css.devDir + "**/*.css", project.res.js.devDir + "**/*.js"]
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 4
			},
			projectWatch: ["watch:htmlTemplates", "watch:sassStyles", "watch:sassPartials"],
			projectWatchReload: ["watch:htmlTemplates", "watch:sassStyles", "watch:sassPartials", "watch:livereloadWatch"]
		}

	});

	grunt.registerTask("datauri-fallback", "Provide Fallbacks Classes for the Background Images that were Converted in DataURI", function() {
		var IE_SASS = "";
		for (var FILE in project.res.images.dataURI) {
			if (grunt.file.isFile(project.res.images.dataURI[FILE])) {
				IE_SASS += "%ie-image-" + project.res.images.dataURI[FILE].split(".")[0].replace(project.res.images.dir, "") + " {\n\t" + "background-image: url(" + project.res.images.dataURI[FILE].replace(project.res.dir, "../") + ");\n}\n";
			}
		}
		if (IE_SASS !== "") {
			grunt.file.write(project.res.css.sass + "tx/_tx-projectImages-IE.scss", IE_SASS);
		}
	});

	grunt.registerTask("datauri-cleanup", "Cleanup After datauri-fallback", function() {
		if (grunt.file.isFile(project.res.css.sass + "tx/_tx-projectImages-base64.scss")) {
			grunt.file.delete(project.res.css.sass + "tx/_tx-projectImages-base64.scss");
		}
		if (grunt.file.isFile(project.res.css.sass + "tx/_tx-projectImages-IE.scss")) {
			grunt.file.delete(project.res.css.sass + "tx/_tx-projectImages-IE.scss");
		}
	});

	grunt.registerTask("process-css", "Concatenating of the .css files", function() {
		var CSS_DIR_REGEX = new RegExp("<link(.)*href=\"" + project.res.css.devDir.replace(project.dir, ""), "g"),
				CSS_IE_DIR_REGEX = new RegExp("<!--(.)*href=\"" + project.res.css.devDir.replace(project.dir, ""), "g"),
				CSS_ALL = grunt.file.read(project.templates.css)
					.replace(/(.|\t|\s|\n)*?<!-- @tx-css -->/, "")
					.replace(/<!-- \/@tx-css -->(.|\t|\s|\n)*/, "")
					.replace(/^\t(.)*tx\/tx-debug(.)*/gm, "")
					.replace(/\t/g, ""),
				CSS = CSS_ALL
					.replace(/<!--(.|\t|\s|\n)*/, "")
					.replace(CSS_DIR_REGEX, "")
					.replace(/\r?\n|\r/g, "")
					.replace(/">$/, ""),
				CSS_IE = CSS_ALL
					.replace(/^<link(.)*/gm, "")
					.replace(CSS_IE_DIR_REGEX, "")
					.replace(/\r?\n|\r/g, "")
					.replace(/"> <\!\[endif\]-->$/, ""),
				CSS_ARRAY = CSS.split("\">"),
				CSS_IE_ARRAY = CSS_IE.split("\"> <![endif]-->"),
				CSS_EXPECTED = CSS_ARRAY.length,
				CSS_ACTUAL = grunt.file.expand([project.res.css.devDir + "*.css", "!" + project.res.css.devDir + "*-IE.css"]).length,
				CSS_IE_EXPECTED = CSS_IE_ARRAY.length,
				CSS_IE_ACTUAL = grunt.file.expand([project.res.css.devDir + "*-IE.css"]).length;
		if ((CSS_EXPECTED === CSS_ACTUAL || (CSS_ARRAY[0] === "" && CSS_ACTUAL === 0)) && (CSS_IE_EXPECTED === CSS_IE_ACTUAL || (CSS_IE_ARRAY[0] === "" && CSS_IE_ACTUAL === 0))) {
			if (CSS_ACTUAL === 0) {
				grunt.log.writeln("No .css files to process.");
			} else {
				var PROCESS_TASKS = [];
				PROCESS_TASKS.push("concat:css");
				grunt.config.set("TASK.CSS_ARRAY", fillAnArray(CSS_ARRAY, project.res.css.devDir));
				if (CSS_IE_ACTUAL !== 0) {
					PROCESS_TASKS.push("concat:cssIE");
					grunt.config.set("TASK.CSS_IE_ARRAY", fillAnArray(CSS_IE_ARRAY, project.res.css.devDir));
				}
				PROCESS_TASKS = PROCESS_TASKS.concat(["string-replace:sassDebug", "csscomb", "cssc", "cssmin"]);
				grunt.task.run(PROCESS_TASKS);
			}
		} else {
			var ERROR_MESSAGE = "";
			if (CSS_EXPECTED > CSS_ACTUAL) {
				ERROR_MESSAGE += "There's got to be more .css files.";
			} else if (CSS_EXPECTED < CSS_ACTUAL) {
				ERROR_MESSAGE += "Not all of the .css files has been referenced.";
			}
			if (CSS_IE_EXPECTED > CSS_IE_ACTUAL) {
				ERROR_MESSAGE += "There's got to be more .css files (IE).";
			} else if (CSS_IE_EXPECTED < CSS_IE_ACTUAL) {
				ERROR_MESSAGE += "Not all of the .css files (IE) has been referenced.";
			}
			grunt.fail.warn(ERROR_MESSAGE);
		}
	});

	grunt.registerTask("process-js", "Concatenating of the .js files", function() {
		var JS_DIR_REGEX = new RegExp("<script(.)*src=\"" + project.res.js.devDir.replace(project.dir, ""), "g"),
				JS = grunt.file.read(project.templates.js)
					.replace(/(.|\t|\s|\n)*?<!-- @tx-js -->/, "")
					.replace(/<!-- \/@tx-js -->(.|\t|\s|\n)*/, "")
					.replace(/^\t(.)*tx\/tx-debug(.)*/gm, "")
					.replace(/\t/g, "")
					.replace(/<!--(.|\t|\s|\n)*/, "")
					.replace(JS_DIR_REGEX, "")
					.replace(/\r?\n|\r/g, "")
					.replace(/"><\/script>$/, ""),
				JS_ARRAY = JS.split("\"></script>"),
				JS_EXPECTED = JS_ARRAY.length,
				JS_ACTUAL = grunt.file.expand([project.res.js.devDir + "*.js"]).length;
		if (JS_EXPECTED === JS_ACTUAL || JS_ARRAY[0] === "" && JS_ACTUAL === 0) {
			if (JS_ACTUAL === 0) {
				grunt.log.writeln("No .js files to process.");
			} else {
				grunt.config.set("TASK.JS_ARRAY", fillAnArray(JS_ARRAY, project.res.js.devDir));
				grunt.task.run(["concat:js", "removelogging:jsClean", "uglify"]);
			}
		} else {
			if (JS_EXPECTED > JS_ACTUAL) {
				grunt.fail.warn("There's got to be more .js files.");
			} else if (JS_EXPECTED < JS_ACTUAL) {
				grunt.fail.warn("Not all of the .js files has been referenced.");
			}
		}
	});

	grunt.registerTask("lint", ["htmlhint", "jshint", "csslint"]);

	grunt.registerTask("test", ["yslow"]);

	grunt.registerTask("images-datauri", ["datauri", "datauri-fallback", "concat:datauri", "datauri-cleanup"]);

	grunt.registerTask("images", ["imagemin", "images-datauri", "svgmin"]);

	grunt.registerTask("generate-css", ["sass", "autoprefixer"]);

	grunt.registerTask("watch-project", ["concurrent"]);

	grunt.registerTask("compile", ["clean:res", "processhtml", "generate-css", "process-css", "process-js"]);

	grunt.registerTask("build", ["compile", "clean:build", "copy:build", "copy:meta", "compress:gzip", "string-replace:build", "htmlmin:cleanup", "compress:build"]);

	grunt.registerTask("build-share", ["build", "copy:share"]);

	grunt.registerTask("build-uncss", ["uncss"]);

};