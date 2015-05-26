//Gruntfile for the TemplateX Project

var TITLE           = 'TemplateX';      // Title
var LANGUAGE        = 'ru';             // Language
var BUILD_DIR       = 'build';          // Project Build
var META_DIR        = 'meta';           // Meta Content
var DEVELOPMENT_DIR = 'dev';            // Project Development
var IMAGES_DIR      = 'images';         // Images
var RESOURCES_DIR   = 'res';            // Resources (CSS, JavaScript, Fonts etc.)
var INDEX_PAGE      = 'index.html';     // Index Page
var CRITICAL_PAGE   = 'critical.html';  // Page Containing Critical Elements
var CRITICAL_WIDTH  = 10000;            // Horizontal Fold
var CRITICAL_HEIGHT = 10000;            // Vertical Fold
var TEMPLATES_DIR   = 'templates';      // Templates
var CSS_TEMPLATE    = '_head.html';     // Template Containing CSS Declarations
var JS_TEMPLATE     = '_scripts.html';  // Template Containing JavaScript Declarations
var CSS_IMAGES_DIR  = 'images';         // CSS Images
var DATA_URI        = [];               // Array of Images (Relative to the CSS Images Directory) to Convert to DataURI
var CSS_DIR         = 'css';            // Production CSS
var SASS_DIR        = 'sass-dev';       // Sass
var CSS_DEV_DIR     = 'css-dev';        // Generated CSS
var CSS_FILENAME    = 'styles';         // Production CSS Filename
var CSS_CRITICAL    = 'critical';       // Critical CSS Filename
var JS_DIR          = 'js';             // Production JavaScript
var JS_DEV_DIR      = 'js-dev';         // JavaScript
var JS_FILENAME     = 'scripts';        // Production JavaScript Filename

function fillAnArray(array, path) {
  var result = [];
  for (var element in array) {
    result.push(path + array[element]);
  }
  return result;
}

module.exports = function(grunt) {

  var project = {
    init: function() {
      this.title = TITLE;
      this.index = INDEX_PAGE;
      this.language = LANGUAGE;
      this.meta = META_DIR;
      this.dir = DEVELOPMENT_DIR + '/';
      this.images = this.dir + IMAGES_DIR + '/';
      var templatesDirCompiled = this.dir + TEMPLATES_DIR + '/';
      var resourcesDirCompiled = this.dir + RESOURCES_DIR + '/';
      this.templates = {
        dir: templatesDirCompiled,
        css: templatesDirCompiled + CSS_TEMPLATE,
        js: templatesDirCompiled + JS_TEMPLATE
      };
      this.res = {
        dir: resourcesDirCompiled,
        images: {
          dir: resourcesDirCompiled + CSS_IMAGES_DIR + '/',
          dataURI: fillAnArray(DATA_URI, resourcesDirCompiled + CSS_IMAGES_DIR + '/')
        },
        css: {
          dir: resourcesDirCompiled + CSS_DIR + '/',
          devDir: resourcesDirCompiled + CSS_DEV_DIR + '/',
          sass: resourcesDirCompiled + SASS_DIR + '/',
          filename: CSS_FILENAME,
          critical: CSS_CRITICAL
        },
        js: {
          dir: resourcesDirCompiled + JS_DIR + '/',
          devDir: resourcesDirCompiled + JS_DEV_DIR + '/',
          filename: JS_FILENAME
        }
      };
      this.build = {
        dir: BUILD_DIR + '/',
        critical: {
          page: CRITICAL_PAGE,
          width: CRITICAL_WIDTH,
          height: CRITICAL_HEIGHT
        }
      };
      return this;
    }
  }.init();

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    htmlhint: {
      options: {
        'htmlhintrc': '.htmlhintrc'
      },
      htmlHint: {
        cwd: project.dir,
        src: ['*.html'],
        expand: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      jscs: {
        cwd: project.res.js.devDir,
        src: ['*.js', '!*.min.js'],
        expand: true
      }
    },
    jshint: {
      options: {
        'jshintrc': '.jshintrc'
      },
      jsHint: {
        cwd: project.res.js.devDir,
        src: ['*.js', '!*.min.js'],
        expand: true
      }
    },
    jsinspect: {
      jsInspect: {
        cwd: project.res.js.devDir,
        src: ['*.js'],
        expand: true
      }
    },
    scsslint: {
      scssLint: {
        cwd: project.res.css.sass,
        src: ['*.scss'],
        expand: true
      }
    },
    csslint: {
      option: {
        'csslintrc': '.csslintrc'
      },
      cssLint: {
        cwd: project.res.css.devDir,
        src: ['*.css', '!*-IE.css'],
        expand: true
      }
    },
    csscss: {
      options: {
        verbose: true
      },
      csscssTest: {
        src: project.res.css.devDir + '*.css'
      }
    },
    colorguard: {
      files: {
        src: project.res.css.devDir + '*.css'
      }
    },
    arialinter: {
      options: {
        level: 'A'
      },
      ariaLinter: {
        cwd: project.build.dir,
        src: ['*.html'],
        expand: true
      }
    },

    backstop: {
      test: {
        options: {
          backstop_path: './node_modules/backstopjs',
          test_path: './tests',
          setup: false,
          configure: false,
          create_references: false,
          run_tests: true
        }
      }
    },

    analyzecss: {
      options: {
        outputMetrics: 'error',
        softFail: true,
        thresholds: grunt.file.readJSON('.analyzecssrc')
      },
      ananlyzeCSS: {
        cwd: project.res.css.dir,
        src: [project.res.css.filename + '.min.css'],
        expand: true
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 5
      },
      generateCSS: {
        cwd: project.res.css.sass,
        src: ['*.scss', '*.sass'],
        dest: project.res.css.devDir,
        ext: '.css',
        expand: true
      },
      generateDebugCSS: {
        cwd: project.res.css.sass + 'project/tx/',
        src: ['*.scss', '*.sass'],
        dest: project.res.css.devDir + '/tx',
        ext: '.css',
        expand: true
      }
    },
    autoprefixer: {
      options: {
        map: true,
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 7'],
        cascade: false
      },
      prefixCSS: {
        cwd: project.res.css.devDir,
        src: ['**/*.css', '!**/*-IE.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },

    concat: {
      datauri: {
        options: {
          separator: '\n\n'
        },
        src: [project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss', project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss'],
        dest: project.res.css.sass + 'project/tx/_tx-projectImages.scss'
      },
      js: {
        options: {
          separator: '\n\n'
        },
        src: '<%= task.jsArray %>',
        dest: project.res.js.dir + project.res.js.filename + '.js'
      },
      css: {
        src: '<%= task.cssArray %>',
        dest: project.res.css.dir + project.res.css.filename + '.css'
      },
      cssIE: {
        src: '<%= task.cssArrayIE %>',
        dest: project.res.css.dir + project.res.css.filename + '-IE.css'
      }
    },

    'string-replace': {
      cssComments: {
        options: {
          replacements: [{
            pattern: /\/\* line \d*, .* \*\/(\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\/\*# sourceMappingURL(.|\t|\s|\r?\n|\r)*?\*\//gi,
            replacement: ''
          }, {
            pattern: /.media \-sass\-debug\-info(.|\t|\s|\r?\n|\r)*?\}\}/gi,
            replacement: ''
          }, {
            pattern: /\/\*\*\* uncss>.*\*\*\*\/(\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\*\s(.)*\*\/(\r?\n|\r)*$/g,
            replacement: ''
          }, {
            pattern: /\*\s(.)*\*\/(\r?\n\t*|\r\t*)*\//g,
            replacement: ''
          }, {
            pattern: /(\r?\n|\r)*\/$/g,
            replacement: ''
          }, {
            pattern: /\/\*(.)*(\r?\n|\r){4}/g,
            replacement: ''
          }]
        },
        files: {
          './': [project.res.css.dir + '*.css']
        }
      },
      build: {
        options: {
          replacements: [{
            pattern: /@tx-title/gi,
            replacement: project.title + ' Project'
          }, {
            pattern: /@tx-language/gi,
            replacement: project.language
          }, {
            pattern: /@tx-launch/gi,
            replacement: project.index
          }, {
            pattern: /.!-- @tx-css -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-css -->/gi,
            replacement: {
              checkIE: function() {
                var cssFiles;
                var cssPath = project.res.css.dir.replace(project.dir, '');
                if (grunt.file.exists(project.res.css.dir + project.res.css.filename + '-IE.css')) {
                  cssFiles = '<link rel="stylesheet" type="text/css" href="' + cssPath + project.res.css.filename + '.min.css">\n    <!--[if lte IE 7]> <link rel="stylesheet" type="text/css" href="' + cssPath + project.res.css.filename + '-IE.min.css"> <![endif]-->';
                } else {
                  cssFiles = '<link rel="stylesheet" type="text/css" href="' + cssPath + project.res.css.filename + '.min.css">';
                }
                return cssFiles;
              }
            }.checkIE()
          }, {
            pattern: /.!-- @tx-js -->(.|\t|\s|\r?\n|\r)*?!-- \/@tx-js -->/gi,
            replacement: '<script type="text/javascript" src="' + project.res.js.dir.replace(project.dir, '') + project.res.js.filename + '.min.js"></script>'
          }]
        },
        files: {
          './': [project.build.dir + '*.{html,webapp}']
        }
      },
      critical: {
        options: {
          replacements: [{
            pattern: /(\r?\n|\r)$/g,
            replacement: ''
          }, {
            pattern: /(\r?\n|\r){5}/g,
            replacement: '\n\n'
          }]
        },
        files: {
          './': [project.res.css.dir + project.res.css.critical + '.css']
        }
      }
    },

    removelogging: {
      jsClean: {
        cwd: project.res.js.dir,
        src: ['*.js'],
        dest: project.res.js.dir,
        expand: true
      },
      jsDevClean: {
        cwd: project.res.js.devDir,
        src: ['*.js'],
        dest: project.res.js.devDir,
        expand: true
      }
    },
    fixmyjs: {
      options: {
        config: '.jshintrc'
      },
      fixMyJS: {
        cwd: project.res.js.dir,
        src: ['*.js'],
        dest: project.res.js.dir,
        ext: '.min.js',
        expand: true
      }
    },
    'closure-compiler': {
      frontend: {
        cwd: project.res.js.dir,
        js: ['*.js', '!*.min.js'],
        jsOutputFile: project.res.js.dir + project.res.js.filename + '.min.js',
        options: {}
      }
    },
    uglify: {
      options: {
        preserveComments: false
      },
      jsMin: {
        cwd: project.res.js.dir,
        src: ['*.min.js'],
        dest: project.res.js.dir,
        expand: true
      }
    },

    uncss: {
      cssOptimize: {
        options: {
          ignore: [/.*-is-.*/, /.*-has-.*/, /.*-are-.*/, /js-.*/],
          stylesheets: [project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.css'],
          timeout: 1000
        },
        files: {
          cssMinFiles: function() {
            var cssMinFilesObject = {};
            cssMinFilesObject[project.res.css.dir + project.res.css.filename + '.css'] = project.dir + '*.html';
            return cssMinFilesObject;
          }
        }.cssMinFiles()
      }
    },
    csscomb: {
      options: {
        config: '.csscombrc'
      },
      cssSortBuild: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        expand: true
      },
      cssSortDev: {
        cwd: project.res.css.devDir,
        src: ['*.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },
    cssc: {
      options: grunt.file.readJSON('.csscrc'),
      cssOptimize: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        ext: '.min.css',
        expand: true
      }
    },
    penthouse: {
      cssCritical: {
        url: project.dir + project.build.critical.page,
        width: project.build.critical.width,
        height: project.build.critical.height,
        outfile: project.res.css.dir + project.res.css.critical + '.css',
        css: project.res.css.dir + project.res.css.filename + '.css'
      }
    },
    cssmin: {
      cssMin: {
        cwd: project.res.css.dir,
        src: ['*.min.css'],
        dest: project.res.css.dir,
        expand: true
      },
      cssMinCritical: {
        cwd: project.res.css.dir,
        src: [project.res.css.critical + '.css'],
        dest: project.res.css.dir,
        ext: '.min.css',
        expand: true
      }
    },

    processhtml: {
      options: {
        includeBase: project.templates.dir,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.templates.dir,
        src: ['*.html', '!_*.html'],
        dest: project.dir,
        ext: '.html',
        expand: true
      }
    },
    htmlmin: {
      options: grunt.file.readJSON('.htmlminrc'),
      cleanup: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      }
    },

    datauri: {
      options: {
        classPrefix: 'image-'
      },
      resImages: {
        src: project.res.images.dataURI,
        dest: project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss'
      }
    },
    imagemin: {
      images: {
        cwd: project.dir,
        src: ['**/*.{png,jpg,gif}', '!**/tx-*.*', '!tx/*.*'],
        dest: project.dir,
        expand: true
      },
      meta: {
        cwd: project.build.dir,
        src: ['*.{png,jpg,gif}'],
        dest: project.build.dir,
        expand: true
      }
    },
    svgmin: {
      svg: {
        cwd: project.dir,
        src: ['**/*.svg', '!**/fonts/**/*.svg'],
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
        src: ['**/*.{png,jpg,gif}', '!**/tx-*.*', '!tx/*.*'],
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
        src: ['*.{png,jpg,gif}'],
        dest: project.build.dir,
        expand: true
      }
    },

    clean: {
      res: [project.res.css.dir, project.res.js.dir + '*.js'],
      reports: [project.res.js.dir + '*.txt'],
      build: [project.build.dir]
    },
    copy: {
      build: {
        cwd: project.dir,
        src: ['**/*.*', '!' + project.build.critical.page, '!**/tx-*.*', '!**/templates/**', '!**/**-dev/**', '!**/tx/**'],
        dest: project.build.dir,
        expand: true
      },
      meta: {
        cwd: project.meta,
        src: ['**/*.{ico,png,jpg,gif,txt,webapp}'],
        dest: project.build.dir,
        expand: true
      }
    },
    compress: {
      cssGzip: {
        options: {
          mode: 'gzip'
        },
        cwd: project.build.dir,
        src: ['**/*.min.css', '!**/' + project.res.css.critical + '.min.css'],
        dest: project.build.dir,
        ext: '.min.css.gz',
        expand: true
      },
      jsGzip: {
        options: {
          mode: 'gzip'
        },
        cwd: project.build.dir,
        src: ['**/*.min.js'],
        dest: project.build.dir,
        ext: '.min.js.gz',
        expand: true
      },
      build: {
        options: {
          mode: 'zip',
          archive: project.title + '.build.zip'
        },
        cwd: project.build.dir,
        src: ['**'],
        dest: '.',
        expand: true
      }
    },

    watch: {
      options: {
        spawn: false
      },
      htmlTemplates: {
        files: [project.templates.dir + '*.html'],
        tasks: ['processhtml']
      },
      sass: {
        files: [project.res.css.sass + '**/*.scss', project.res.css.sass + '**/*.sass'],
        tasks: ['sass', 'autoprefixer']
      },
      sassImages: {
        files: [project.res.images.dir + '**/*.{png,jpg,gif,svg}'],
        tasks: ['sass', 'autoprefixer', 'processhtml']
      },
      livereloadWatch: {
        options: {
          livereload: true
        },
        files: [project.dir + '*.html', project.res.css.devDir + '**/*.css', project.res.js.devDir + '**/*.js', project.images + '**/*.{png,jpg,gif,svg}']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      projectWatch: ['watch:htmlTemplates', 'watch:sass', 'watch:sassImages', 'watch:livereloadWatch']
    }

  });

  grunt.registerTask('datauri-fallback', 'Provide Fallbacks Classes for the Background Images that were Converted in DataURI', function() {
    var sassIE = '';
    for (var file in project.res.images.dataURI) {
      if (grunt.file.isFile(project.res.images.dataURI[file])) {
        sassIE += '%ie-image-' + project.res.images.dataURI[file].split('.')[0].replace(project.res.images.dir, '') + ' {\n\t' + 'background-image: url(' + project.res.images.dataURI[file].replace(project.res.dir, '../') + ');\n}\n';
      }
    }
    if (sassIE !== '') {
      grunt.file.write(project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss', sassIE);
    }
  });

  grunt.registerTask('datauri-cleanup', 'Cleanup After datauri-fallback', function() {
    if (grunt.file.isFile(project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss')) {
      grunt.file.delete(project.res.css.sass + 'project/tx/_tx-projectImages-base64.scss');
    }
    if (grunt.file.isFile(project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss')) {
      grunt.file.delete(project.res.css.sass + 'project/tx/_tx-projectImages-IE.scss');
    }
  });

  grunt.registerTask('process-css', 'css processing', function() {
    var cssDirRegEx = new RegExp('<link(.)*href="' + project.res.css.devDir.replace(project.dir, ''), 'g');
    var cssDirRegExIE = new RegExp('<!--(.)*href="' + project.res.css.devDir.replace(project.dir, ''), 'g');
    var cssAll = grunt.file.read(project.templates.css)
        .replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-css -->/, '')
        .replace(/<!-- \/@tx-css -->(.|\t|\s|\r?\n|\r)*/, '')
        .replace(/^\s(.)*tx\/tx-debug(.)*/gm, '');
    var css = cssAll
        .replace(/<!--(.|\t|\s|\r?\n|\r)*/, '')
        .replace(cssDirRegEx, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/\s/g, '')
        .replace(/">$/, '');
    var cssIE = cssAll
        .replace(/^\s*<link(.)*/gm, '')
        .replace(cssDirRegExIE, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/\s/g, '')
        .replace(/"><\!\[endif\]-->$/, '');
    var cssArray = css.split('">');
    var cssArrayIE = cssIE.split('"><![endif]-->');
    var cssExpected = cssArray.length;
    var cssActual = grunt.file.expand([project.res.css.devDir + '*.css', '!' + project.res.css.devDir + '*-IE.css']).length;
    var cssExpectedIE = cssArrayIE.length;
    var cssActualIE = grunt.file.expand([project.res.css.devDir + '*-IE.css']).length;
    if ((cssExpected === cssActual || (cssArray[0] === '' && cssActual === 0)) && (cssExpectedIE === cssActualIE || (cssArrayIE[0] === '' && cssActualIE === 0))) {
      if (cssActual === 0) {
        grunt.log.writeln('No .css-files to process.');
      } else {
        var processTasks = [];
        processTasks.push('concat:css');
        grunt.config.set('task.cssArray', fillAnArray(cssArray, project.res.css.devDir));
        if (cssActualIE !== 0) {
          processTasks.push('concat:cssIE');
          grunt.config.set('task.cssArrayIE', fillAnArray(cssArrayIE, project.res.css.devDir));
        }
        processTasks = processTasks.concat(['uncss', 'csscomb', 'string-replace:cssComments', 'cssc', 'cssmin:cssMin']);
        grunt.task.run(processTasks);
      }
    } else {
      var errorMessage = '';
      if (cssExpected > cssActual) {
        errorMessage += 'There is got to be more .css-files. ';
      } else if (cssExpected < cssActual) {
        errorMessage += 'Not all of the .css-files has been referenced. ';
      }
      if (cssExpectedIE > cssActualIE) {
        errorMessage += 'There is got to be more .css-files (IE).';
      } else if (cssExpectedIE < cssActualIE) {
        errorMessage += 'Not all of the .css-files (IE) has been referenced.';
      }
      grunt.fail.warn(errorMessage);
    }
  });

  grunt.registerTask('process-js', 'JS processing', function() {
    var jsDirRegEx = new RegExp('<script(.)*src="' + project.res.js.devDir.replace(project.dir, ''), 'g');
    var js = grunt.file.read(project.templates.js)
        .replace(/(.|\t|\s|\r?\n|\r)*?<!-- @tx-js -->/, '')
        .replace(/<!-- \/@tx-js -->(.|\t|\s|\r?\n|\r)*/, '')
        .replace(/^\s(.)*tx\/tx-debug(.)*/gm, '')
        .replace(/<!--(.|\t|\s|\r?\n|\r)*/, '')
        .replace(jsDirRegEx, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/\s/g, '')
        .replace(/"><\/script>$/, '');
    var jsArray = js.split('"></script>');
    var jsExpected = jsArray.length;
    var jsActual = grunt.file.expand([project.res.js.devDir + '*.js']).length;
    if (jsExpected === jsActual || jsArray[0] === '' && jsActual === 0) {
      if (jsActual === 0) {
        grunt.log.writeln('No .js-files to process.');
      } else {
        grunt.config.set('task.jsArray', fillAnArray(jsArray, project.res.js.devDir));
        grunt.task.run(['concat:js', 'removelogging', 'fixmyjs', 'closure-compiler', 'uglify']);
      }
    } else {
      if (jsExpected > jsActual) {
        grunt.fail.warn('There is got to be more .js-files.');
      } else if (jsExpected < jsActual) {
        grunt.fail.warn('Not all of the .js-files has been referenced.');
      }
    }
  });

  grunt.registerTask('critical-cssInline', 'Injecting critical css', function() {
    var criticalCssRegEx = new RegExp('<(.)*' + project.res.css.filename + '.min.css(.)*>', 'g');
    var criticalCssNoScript = '<noscript><link rel="stylesheet" type="text/css" href="' + project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.min.css' + '"></noscript>';
    var criticalCssCritical = '<style type="text/css">' + grunt.file.read(project.res.css.dir + project.res.css.critical + '.min.css') + '</style>';
    var criticalCss = criticalCssCritical + '\n    ' + criticalCssNoScript;
    var cssLoad = '<script type="text/javascript" async>function loadcss(a){function e(){for(var d,f=0,g=c.length,f=0;g>f;f++)c[f].href&&c[f].href.indexOf(a)>-1&&(d=!0);d?b.media="all":setTimeout(e)}var b=window.document.createElement("link"),c=window.document.styleSheets,d=window.document.getElementsByTagName("style")[0];return b.rel="stylesheet",b.type="text/css",b.href=a,b.media="only x",d.parentNode.insertBefore(b,d.nextSibling),e(),b}loadcss("' + project.res.css.dir.replace(project.dir, '') + project.res.css.filename + '.min.css");</script>';
    grunt.file.recurse(project.build.dir, function(absPath, root, subDir, filename) {
      if (!subDir && filename.indexOf('.html') > -1) {
        var pagePath = absPath;
        var page = grunt.file.read(pagePath);
        if (page.search(criticalCssRegEx) > 0) {
          page = page.replace(criticalCssRegEx, criticalCss).replace('<!-- @tx-critical -->', cssLoad);
          grunt.file.write(pagePath, page);
        }
      }
    });
  });

  grunt.registerTask('quality', ['htmlhint', 'jscs', 'jshint', 'jsinspect', 'scsslint', 'csslint', 'csscss', 'colorguard', 'arialinter']);

  grunt.registerTask('test', ['backstop']);

  grunt.registerTask('performance', ['analyzecss']);

  grunt.registerTask('images-datauri', ['datauri', 'datauri-fallback', 'concat:datauri', 'datauri-cleanup']);

  grunt.registerTask('process-svg', ['svgmin']);

  grunt.registerTask('images', ['imagemin', 'images-datauri', 'process-svg']);

  grunt.registerTask('generate-css', ['sass', 'autoprefixer']);

  grunt.registerTask('watch-project', ['concurrent']);

  grunt.registerTask('compile', ['clean:res', 'processhtml', 'generate-css', 'process-css', 'process-js', 'images']);

  grunt.registerTask('critical', ['penthouse', 'string-replace:critical', 'cssmin:cssMinCritical', 'critical-cssInline']);

  grunt.registerTask('build-commonFirst', ['compile', 'clean:build', 'clean:reports', 'copy:build', 'copy:meta', 'compress:cssGzip:', 'compress:jsGzip:', 'string-replace:build']);

  grunt.registerTask('build-commonSecond', ['htmlmin:cleanup', 'imagemin:meta']);

  grunt.registerTask('build', ['build-commonFirst', 'build-commonSecond']);

  grunt.registerTask('build-critical', ['build-commonFirst', 'critical', 'build-commonSecond']);

  grunt.registerTask('compress-build', ['compress:build']);

};
