//Gruntfile for the TemplateX Project

var TITLE							= "TemplateX",							// Title
		LANGUAGE					= "ru",											// Language
		BUILD_DIR					= "build",									// Project Build
		META_DIR					= "meta",										// Meta Content
		DEVELOPMENT_DIR		= "dev",										// Project Development
		IMAGES_DIR				= "images",									// Images
		RESOURCES_DIR			= "res",										// Resources (CSS, JavaScript, Fonts etc.)
		CRITICAL_PAGE			= "index.html",							// Page That Should Contain CRP CSS Styles
		CRITICAL_WIDTH		= 1200,											// Horizontal Fold
		CRITICAL_HEIGHT		= 900,											// Vertical Fold
		TEMPLATES_DIR			= "templates",							// Templates
		CSS_TEMPLATE			= "_head.html",							// Template Containing CSS Declarations
		JS_TEMPLATE				= "_scripts.html",					// Template Containing JavaScript Declarations
		CSS_IMAGES_DIR		= "images",									// CSS Images
		DATA_URI					= [],												// Array of Images (Relative to the CSS Images Directory) to Convert to DataURI
		CSS_DIR						= "css",										// Production CSS
		SASS_DIR					= "sass-dev",								// Sass
		CSS_DEV_DIR				= "css-dev",								// Generated CSS
		CSS_FILENAME			= "styles",									// Production CSS Filename
		CSS_CRITICAL			= "critical",								// Critical CSS Filename
		JS_DIR						= "js",											// Production JavaScript
		JS_DEV_DIR				= "js-dev",									// JavaScript
		JS_FILENAME				= "scripts";								// Production JavaScript Filename

function fillAnArray(ARRAY, PATH) {
	var RESULT = [];
	for (var ELEMENT in ARRAY) {
		RESULT.push(PATH + ARRAY[ELEMENT]);
	}
	return RESULT;
}

module.exports = function(grunt) {

	var project = {
		init: function() {
			this.title = TITLE;
			this.language = LANGUAGE;
			this.meta = META_DIR;
			this.dir = DEVELOPMENT_DIR + "/";
			this.images = this.dir + IMAGES_DIR + "/";
			var TEMPLATES_DIR_COMPILED = this.dir + TEMPLATES_DIR + "/",
					RESOURCES_DIR_COMPILED = this.dir + RESOURCES_DIR + "/";
			this.templates = {
				dir: TEMPLATES_DIR_COMPILED,
				css: TEMPLATES_DIR_COMPILED + CSS_TEMPLATE,
				js: TEMPLATES_DIR_COMPILED + JS_TEMPLATE
			};
			this.res = {
				dir: RESOURCES_DIR_COMPILED,
				images: {
					dir: RESOURCES_DIR_COMPILED + CSS_IMAGES_DIR + "/",
					dataURI: fillAnArray(DATA_URI, RESOURCES_DIR_COMPILED + CSS_IMAGES_DIR + "/")
				},
				css: {
					dir: RESOURCES_DIR_COMPILED + CSS_DIR + "/",
					devDir: RESOURCES_DIR_COMPILED + CSS_DEV_DIR + "/",
					sass: RESOURCES_DIR_COMPILED + SASS_DIR + "/",
					filename: CSS_FILENAME,
					critical: CSS_CRITICAL
				},
				js: {
					dir: RESOURCES_DIR_COMPILED + JS_DIR + "/",
					devDir: RESOURCES_DIR_COMPILED + JS_DEV_DIR + "/",
					filename: JS_FILENAME
				}
			};
			this.build = {
				dir: BUILD_DIR + "/",
				critical: {
					page: CRITICAL_PAGE,
					width: CRITICAL_WIDTH,
					height: CRITICAL_HEIGHT
				}
			};
			return this;
		}
	}.init();

	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		
		htmlhint: {
			options: {
				"htmlhintrc": ".htmlhintrc"
			},
			htmlHint: {
				cwd: project.build.dir,
				src: ["*.html"],
				expand: true
			}
		},
		jshint: {
			options: {
				"jshintrc": ".jshintrc"
			},
			jsHint: {
				cwd: project.res.js.devDir,
				src: ["*.js"],
				expand: true
			}
		},
		jsinspect: {
			jsInspect: {
				cwd: project.res.js.devDir,
				src: ["*.js"],
				expand: true	
			}
		},
		csslint: {
			option: {
				"csslintrc": ".csslintrc"
			},
			cssLint: {
				cwd: project.res.css.devDir,
				src: ["*.css", "!*-IE.css"],
				expand: true
			}
		},
		colorguard: {
			files: {
				src: project.res.css.devDir + "*.css"
			}
		},
		arialinter: {
			options: {
				level: "A"
			},
			ariaLinter: {
				cwd: project.build.dir,
				src: ["*.html"],
				expand: true
			}
		},

		analyzecss: {
			options: {
				outputMetrics: "error",
				softFail: true,
				thresholds: grunt.file.readJSON(".analyzecssrc")
			},
			ananlyzeCSS: {
				sources: [project.res.css.dir + project.res.css.filename + ".min.css"]
			}
		},

		sass: {
			options: {
				sourceMap: true,
				precision: 5
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
				map: true,
				browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "Explorer >= 7"],
				cascade: false
			},
			prefixCSS: {
				cwd: project.res.css.devDir,
				src: ["**/*.css", "!**/*-IE.css"],
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
				dest: project.res.css.sass + "tx/_tx-projectImages.scss"
			},
			js: {
				options: {
					separator: "\n\n"
				},
				src: "<%= TASK.JS_ARRAY %>",
				dest: project.res.js.dir + project.res.js.filename + ".js"
			},
			css: {
				src: "<%= TASK.CSS_ARRAY %>",
				dest: project.res.css.dir + project.res.css.filename + ".css"
			},
			cssIE: {
				src: "<%= TASK.CSS_IE_ARRAY %>",
				dest: project.res.css.dir + project.res.css.filename + "-IE.css"
			}
		},

		"string-replace": {
			commentsFirst: {
				options: {
					replacements: [{
						pattern: /\/\* line \d*, .* \*\/(\r?\n|\r)*/g,
						replacement: ""
					},{
						pattern: /\/\*# sourceMappingURL(.|\t|\s|\r?\n|\r)*?\*\//gi,
						replacement: ""
					},{
						pattern: /.media \-sass\-debug\-info(.|\t|\s|\r?\n|\r)*?\}\}/gi,
						replacement: ""
					},{
						pattern: /\*\s(.)*\*\/(\r?\n|\r)*$/g,
						replacement: ""
					},{
						pattern: /\*\s(.)*\*\/(\r?\n|\r)*\//g,
						replacement: ""
					}]
				},
				files: {
					"./": [project.res.css.dir + "*.css"]
				}
			},
			commentsSecond: {
				options: {
					replacements: [{
						pattern: /(\r?\n|\r)*\/$/g,
						replacement: ""
					},{
						pattern: /\/\*(.)*(\r?\n|\r){4}/g,
						replacement: ""
					}]
				},
				files: {
					"./": [project.res.css.dir + "*.css"]
				}
			},
			build: {
				options: {
					replacements: [{
						pattern: /@tx-title/gi,
						replacement: project.title + " Project"
					},{
						pattern: /@tx-language/gi,
						replacement: project.language
					},{
						pattern: /.!-- @tx-css -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-css -->/gi,
						replacement: {
							checkIE: function() {
								var CSS_FILES,
										CSS_PATH = project.res.css.dir.replace(project.dir, "");
								if (grunt.file.exists(project.res.css.dir + project.res.css.filename + "-IE.css")) {
									CSS_FILES = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + ".min.css\">\n\t\t<!--[if lte IE 7]> <link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + "-IE.min.css\"> <![endif]-->";
								} else {
									CSS_FILES = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + CSS_PATH + project.res.css.filename + ".min.css\">";
								}
								return CSS_FILES;
							}
						}.checkIE()
					},{
						pattern: /.!-- @tx-js -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-js -->/gi,
						replacement: "<script type=\"text/javascript\" src=\"" + project.res.js.dir.replace(project.dir, "") + project.res.js.filename + ".min.js\"></script>"
					}]
				},
				files: {
					"./": [project.build.dir + "*.html"]
				}
			},
			critical: {
				options: {
					replacements: [{
						pattern: /(\r?\n|\r)$/g,
						replacement: ""
					},{
						pattern: /(\r?\n|\r){5}/g,
						replacement: "\n\n"
					}]
				},
				files: {
					"./": [project.res.css.dir + project.res.css.critical + ".css"]
				}
			}
		},

		removelogging: {
			jsClean: {
				cwd: project.res.js.dir,
				src: ["*.js"],
				dest: project.res.js.dir,
				expand: true
			},
			jsDevClean: {
				cwd: project.res.js.devDir,
				src: ["*.js"],
				dest: project.res.js.devDir,
				expand: true
			}
		},
		fixmyjs: {
			options: {
				config: ".jshintrc",
				indentpref: "tabs"
			},
			fixMyJS: {
				cwd: project.res.js.dir,
				src: ["*.js"],
				dest: project.res.js.dir,
				expand: true
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
				expand: true
			}
		},

		uncss: {
			cssOptimize: {
				options: {
					ignore: [/(.)*-is-(.)*/, /(.)*-has-(.)*/, /(.)*-are-(.)*/],
					stylesheets: [project.res.css.dir.replace(project.dir, "") + project.res.css.filename + ".css"]
				},
				files: {
					cssMinFiles: function() {
						var cssMinFilesObject = {};
						cssMinFilesObject[project.res.css.dir + project.res.css.filename + ".css"] = project.dir + "*.html";
						return cssMinFilesObject;
					}
				}.cssMinFiles()
			}
		},
		csscomb: {
			options: {
				config: ".csscombrc"
			},
			cssSortBuild: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				expand: true
			},
			cssSortDev: {
				cwd: project.res.css.devDir,
				src: ["*.css"],
				dest: project.res.css.devDir,
				expand: true
			}
		},
		cssc: {
			options: grunt.file.readJSON(".csscrc"),
			cssOptimize: {
				cwd: project.res.css.dir,
				src: ["*.css"],
				dest: project.res.css.dir,
				ext: ".min.css",
				expand: true
			}
		},
		penthouse: {
			cssCritical: {
				url: project.build.dir + project.build.critical.page,
				width: project.build.critical.width,
				height: project.build.critical.height,
				outfile: project.res.css.dir + project.res.css.critical + ".css",
				css: project.res.css.dir + project.res.css.filename + ".css"
			}
		},
		cssmin: {
			cssMin: {
				cwd: project.res.css.dir,
				src: ["*.min.css"],
				dest: project.res.css.dir,
				expand: true
			},
			cssMinCritical: {
				cwd: project.res.css.dir,
				src: [project.res.css.critical + ".css"],
				dest: project.res.css.dir,
				ext: ".min.css",
				expand: true
			},
			svg: {
				cwd: project.dir,
				src: ["**/*.svg"],
				dest: project.dir,
				expand: true
			}
		},

		processhtml: {
			options: {
				includeBase: project.templates.dir,
				commentMarker: "@tx-process",
				recursive: true
			},
			templates: {
				cwd: project.templates.dir,
				src: ["*.html", "!_*.html"],
				dest: project.dir,
				ext: ".html",
				expand: true
			}
		},
		htmlmin: {
			options: grunt.file.readJSON(".htmlminrc"),
			cleanup: {
				cwd: project.build.dir,
				src: ["*.html"],
				dest: project.build.dir,
				expand: true
			}
		},

		datauri: {
			options: {
				classPrefix: "image-"
			},
			resImages: {
				src: project.res.images.dataURI,
				dest: project.res.css.sass + "tx/_tx-projectImages-base64.scss"
			}
		},
		imagemin: {
			images: {
				cwd: project.dir,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.dir,
				expand: true
			},
			meta: {
				cwd: project.build.dir,
				src: ["*.{png,jpg,gif}"],
				dest: project.build.dir,
				expand: true
			}
		},
		svgmin: {
			svg: {
				cwd: project.dir,
				src: ["**/*.svg", "!**/fonts/**/*.svg"],
				dest: project.dir,
				expand: true
			}
		},
		imageoptim: {
			images: {
				options: {
					jpegMini: true,
					quitAfter: true
				},
				cwd: project.dir,
				src: ["**/*.{png,jpg,gif}", "!**/tx-*.*", "!tx/*.*"],
				dest: project.dir,
				expand: true
			},
			meta: {
				options: {
					jpegMini: true,
					imageAlpha: true,
					quitAfter: true
				},
				cwd: project.build.dir,
				src: ["*.{png,jpg,gif}"],
				dest: project.build.dir,
				expand: true
			}
		},

		clean: {
			res: [project.res.css.dir, project.res.js.dir + "*.js"],
			build: [project.build.dir]
		},
		copy: {
			build: {
				cwd: project.dir,
				src: ["**/*.*", "!**/tx-*.*", "!**/templates/**", "!**/**-dev/**", "!**/tx/**"],
				dest: project.build.dir,
				expand: true
			},
			meta: {
				cwd: project.meta,
				src: ["**/*.{ico,png,jpg,gif,txt}"],
				dest: project.build.dir,
				expand: true
			}
		},
		compress: {
			cssGzip: {
				options: {
					mode: "gzip"
				},
				cwd: project.build.dir,
				src: ["**/*.min.css", "!**/" + project.res.css.critical + ".min.css"],
				dest: project.build.dir,
				ext: ".min.css.gz",
				expand: true
			},
			jsGzip: {
				options: {
					mode: "gzip"
				},
				cwd: project.build.dir,
				src: ["**/*.min.js"],
				dest: project.build.dir,
				ext: ".min.js.gz",
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
			sassImages: {
				files: [project.res.images.dir + "**/*.{png,jpg,gif,svg}"],
				tasks: ["sass", "autoprefixer", "processhtml"]
			},
			livereloadWatch: {
				options: {
					livereload: true
				},
				files: [project.dir + "*.html", project.res.css.devDir + "**/*.css", project.res.js.devDir + "**/*.js", project.images + "**/*.{png,jpg,gif,svg}"]
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 5
			},
			projectWatch: ["watch:htmlTemplates", "watch:sassStyles", "watch:sassPartials", "watch:sassImages", "watch:livereloadWatch"]
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

	grunt.registerTask("process-css", "CSS processing", function() {
		var CSS_DIR_REGEX = new RegExp("<link(.)*href=\"" + project.res.css.devDir.replace(project.dir, ""), "g"),
				CSS_IE_DIR_REGEX = new RegExp("<!--(.)*href=\"" + project.res.css.devDir.replace(project.dir, ""), "g"),
				CSS_ALL = grunt.file.read(project.templates.css)
					.replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-css -->/, "")
					.replace(/<!-- \/@tx-css -->(.|\t|\s|\r?\n|\r)*/, "")
					.replace(/^\t(.)*tx\/tx-debug(.)*/gm, "")
					.replace(/\t/g, ""),
				CSS = CSS_ALL
					.replace(/<!--(.|\t|\s|\r?\n|\r)*/, "")
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
				grunt.log.writeln("No .css-files to process.");
			} else {
				var PROCESS_TASKS = [];
				PROCESS_TASKS.push("concat:css");
				grunt.config.set("TASK.CSS_ARRAY", fillAnArray(CSS_ARRAY, project.res.css.devDir));
				if (CSS_IE_ACTUAL !== 0) {
					PROCESS_TASKS.push("concat:cssIE");
					grunt.config.set("TASK.CSS_IE_ARRAY", fillAnArray(CSS_IE_ARRAY, project.res.css.devDir));
				}
				PROCESS_TASKS = PROCESS_TASKS.concat(["uncss", "string-replace:commentsFirst", "string-replace:commentsSecond", "csscomb", "cssc", "cssmin:cssMin"]);
				grunt.task.run(PROCESS_TASKS);
			}
		} else {
			var ERROR_MESSAGE = "";
			if (CSS_EXPECTED > CSS_ACTUAL) {
				ERROR_MESSAGE += "There's got to be more .css-files. ";
			} else if (CSS_EXPECTED < CSS_ACTUAL) {
				ERROR_MESSAGE += "Not all of the .css-files has been referenced. ";
			}
			if (CSS_IE_EXPECTED > CSS_IE_ACTUAL) {
				ERROR_MESSAGE += "There's got to be more .css-files (IE).";
			} else if (CSS_IE_EXPECTED < CSS_IE_ACTUAL) {
				ERROR_MESSAGE += "Not all of the .css-files (IE) has been referenced.";
			}
			grunt.fail.warn(ERROR_MESSAGE);
		}
	});

	grunt.registerTask("process-js", "JS processing", function() {
		var JS_DIR_REGEX = new RegExp("<script(.)*src=\"" + project.res.js.devDir.replace(project.dir, ""), "g"),
				JS = grunt.file.read(project.templates.js)
					.replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-js -->/, "")
					.replace(/<!-- \/@tx-js -->(.|\t|\s|\r?\n|\r)*/, "")
					.replace(/^\t(.)*tx\/tx-debug(.)*/gm, "")
					.replace(/\t/g, "")
					.replace(/<!--(.|\t|\s|\r?\n|\r)*/, "")
					.replace(JS_DIR_REGEX, "")
					.replace(/\r?\n|\r/g, "")
					.replace(/"><\/script>$/, ""),
				JS_ARRAY = JS.split("\"></script>"),
				JS_EXPECTED = JS_ARRAY.length,
				JS_ACTUAL = grunt.file.expand([project.res.js.devDir + "*.js"]).length;
		if (JS_EXPECTED === JS_ACTUAL || JS_ARRAY[0] === "" && JS_ACTUAL === 0) {
			if (JS_ACTUAL === 0) {
				grunt.log.writeln("No .js-files to process.");
			} else {
				grunt.config.set("TASK.JS_ARRAY", fillAnArray(JS_ARRAY, project.res.js.devDir));
				grunt.task.run(["concat:js", "removelogging", "fixmyjs", "uglify"]);
			}
		} else {
			if (JS_EXPECTED > JS_ACTUAL) {
				grunt.fail.warn("There's got to be more .js-files.");
			} else if (JS_EXPECTED < JS_ACTUAL) {
				grunt.fail.warn("Not all of the .js-files has been referenced.");
			}
		}
	});

	grunt.registerTask("critical-cssInline", "Injecting critical CSS", function() {
		var CRITICAL_CSS_REGEX = new RegExp("<(.)*" + project.res.css.filename + ".min.css(.)*>", "g"),
				CRITICAL_CSS = "<style type=\"text/css\">" + grunt.file.read(project.res.css.dir + project.res.css.critical + ".min.css") + "</style>",
				CSS_LOAD = "\t<script type=\"text/javascript\">function loadCSS(a){function e(){for(var d,f=0,g=c.length,f=0;g>f;f++)c[f].href&&c[f].href.indexOf(a)>-1&&(d=!0);d?b.media=\"all\":setTimeout(e)}var b=window.document.createElement(\"link\"),c=window.document.styleSheets,d=window.document.getElementsByTagName(\"style\")[0];return b.rel=\"stylesheet\",b.type=\"text/css\",b.href=a,b.media=\"only x\",d.parentNode.insertBefore(b,d.nextSibling),e(),b}loadCSS(\"" + project.res.css.dir.replace(project.dir, "") + project.res.css.filename + ".min.css\");</script>\n\t</body>",
				PAGE_PATH = project.build.dir + project.build.critical.page,
				PAGE = grunt.file.read(PAGE_PATH).replace(CRITICAL_CSS_REGEX, CRITICAL_CSS).replace("</body>", CSS_LOAD);
		grunt.file.write(PAGE_PATH, PAGE);
	});

	grunt.registerTask("quality", ["htmlhint", "jshint", "jsinspect", "csslint", "colorguard", "arialinter"]);

	grunt.registerTask("performance", ["analyzecss"]);

	grunt.registerTask("images-datauri", ["datauri", "datauri-fallback", "concat:datauri", "datauri-cleanup"]);

	grunt.registerTask("process-svg", ["svgmin", "cssmin:svg"]);

	grunt.registerTask("images", ["imagemin", "images-datauri", "process-svg"]);

	grunt.registerTask("generate-css", ["sass", "autoprefixer"]);

	grunt.registerTask("watch-project", ["concurrent"]);

	grunt.registerTask("compile", ["clean:res", "processhtml", "generate-css", "process-css", "process-js", "process-svg"]);

	grunt.registerTask("critical", ["penthouse", "string-replace:critical", "cssmin:cssMinCritical", "critical-cssInline"]);

	grunt.registerTask("build-commonFirst", ["compile", "clean:build", "copy:build", "copy:meta", "compress:cssGzip:", "compress:jsGzip:", "string-replace:build"]);

	grunt.registerTask("build-commonSecond", ["htmlmin:cleanup", "imagemin:meta"]);

	grunt.registerTask("build", ["build-commonFirst", "build-commonSecond"]);

	grunt.registerTask("build-critical", ["build-commonFirst", "critical", "build-commonSecond"]);

	grunt.registerTask("compress-build", ["compress:build"]);

};