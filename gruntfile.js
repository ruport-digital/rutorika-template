// Gruntfile for the TemplateX Project

'use strict';

const PROJECT           = 'TemplateX';    // Project Name
const LANGUAGE          = 'ru';           // Language

const DEVELOPMENT_DIR   = 'dev';          // Development
const BUILD_DIR         = 'build';        // Build
const META_DIR          = 'meta';         // Meta Content
const TESTS_DIR         = 'tests';        // Tests
const IMAGES_DIR        = 'images';       // Content Images

const RESOURCES_DIR     = 'res';          // Resources (CSS, JavaScript, Fonts, etc.)
const COMPONENTS_DIR    = 'components';   // Components

const TEMPLATES_DIR     = 'templates';    // Templates
const INDEX_PAGE        = 'index.html';   // Index Page
const CRITICAL_DESK_W   = 1280;           // Horizontal Fold on Desktop
const CRITICAL_DESK_H   = 800;            // Vertical Fold on Desktop
const CRITICAL_MOBILE_W = 320;            // Horizontal Fold on Mobile
const CRITICAL_MOBILE_H = 640;            // Vertical Fold on Mobile

const CSS_IMAGES_DIR    = 'images';       // CSS Images (Sprites, Icons, etc.)
const SPRITES           = [];             // CSS Images to Compile into Separate Sprite Sheets
const DATA_URI          = [];             // CSS Images to Convert to DataURI
const DENSITIES         = [1, 2, 3];      // Pixel Densities

const SASS_DIR          = 'sass';         // Sass
const CSS_DIR           = 'css';          // CSS
const CSS_FILENAME      = 'styles';       // CSS Filename

const JS_DEV_DIR        = 'js-dev';       // Development JavaScript
const JS_DIR            = 'js';           // JavaScript
const JS_BUNDLE         = 'scripts';      // JavaScript Filename

const FONTS_DIR         = 'fonts';        // Fonts

module.exports = function(grunt) {

  var project = {
    name: PROJECT,
    language: LANGUAGE,
    meta: `${META_DIR}/`,
    dir: `${DEVELOPMENT_DIR}/`,
    images: `${DEVELOPMENT_DIR}/${IMAGES_DIR}/`,
    index: INDEX_PAGE,
    res: {
      dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/`,
      templates: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${TEMPLATES_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${TEMPLATES_DIR}/${COMPONENTS_DIR}/`,
      },
      images: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${CSS_IMAGES_DIR}/`,
        sprites: SPRITES,
        dataURI: DATA_URI,
        desities: DENSITIES
      },
      css: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${CSS_DIR}/`,
        sass: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${SASS_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${SASS_DIR}/${COMPONENTS_DIR}/`,
        filename: CSS_FILENAME
      },
      js: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DIR}/`,
        devDir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DEV_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DEV_DIR}/${COMPONENTS_DIR}/`,
        bundle: JS_BUNDLE
      },
      fonts: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${FONTS_DIR}/`
      }
    },
    tests: {
      backstop: `${TESTS_DIR}/backstop/`,
      mocha: `${TESTS_DIR}/mocha/`
    },
    build: {
      dir: BUILD_DIR + '/',
      critical: {
        widthDesktop: CRITICAL_DESK_W,
        heightDesktop: CRITICAL_DESK_H,
        widthMobile: CRITICAL_MOBILE_W,
        heightMobile: CRITICAL_MOBILE_H
      }
    }
  };

  var helpers = {
    temp: 'tmp/',
    scss: 'project/',
    spritesSCSS: '_project-sprites.scss',
    dataURISCSS: '_project-images.scss',
    dataURI: '_project-base64.scss',
    dataURIFallback: '_project-imagesIE.scss',
    sprites: SPRITES.map(sprite => `!**/${sprite.split('.')[0]}*/*.*`),
    imageFiles: '{png,jpg,jpeg,gif,svg}',
    dontCopy: ['!**/*.map', '!**/**-dev/**', '!**/tx-*.*', '!**/tx/**']
  };

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    htmlhint: {
      options: {
        'htmlhintrc': '.htmlhintrc'
      },
      test: {
        cwd: project.build.dir,
        src: ['*.html'],
        expand: true
      }
    },
    arialinter: {
      options: {
        level: 'A'
      },
      test: {
        cwd: project.build.dir,
        src: ['*.html'],
        expand: true
      }
    },
    scsslint: {
      test: {
        cwd: project.res.css.sass,
        src: ['**/*.{scss,sass}', '!**/*-IE.{scss,sass}'],
        expand: true
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      test: {
        cwd: project.res.css.dir,
        src: ['*.css', '!*.min.css', '!*-IE.css'],
        expand: true
      }
    },
    csscss: {
      options: {
        shorthand: false,
        verbose: true
      },
      test: {
        cwd: project.res.css.dir,
        src: ['*.css', '!*.min.css', '!*-IE.css'],
        expand: true
      }
    },
    colorguard: {
      files: {
        cwd: project.res.css.dir,
        src: ['*.css', '!*.min.css', '!*-IE.css'],
        expand: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}/**/*.js`],
        expand: true
      }
    },
    jshint: {
      options: {
        'jshintrc': '.jshintrc'
      },
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}/**/*.js`],
        expand: true
      }
    },
    jsinspect: {
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}/**/*.js`],
        expand: true
      }
    },

    analyzecss: {
      options: {
        outputMetrics: 'error',
        softFail: true,
        thresholds: grunt.file.readJSON('.analyzecssrc')
      },
      test: {
        cwd: project.res.css.dir,
        src: ['*.min.css', '!*-IE.min.css'],
        expand: true
      }
    },

    backstop: {
      options: {
        'backstop_path': 'node_modules/backstopjs',
        'test_path': project.tests.backstop
      },
      test: {
        options: {
          setup: false,
          configure: false,
          'create_references': false,
          'run_tests': true
        }
      },
      ref: {
        options: {
          setup: false,
          configure: false,
          'create_references': true,
          'run_tests': false
        }
      }
    },
    mochaTest: {
      options: {
        quiet: false
      },
      test: {
        cwd: project.tests.mocha,
        src: ['**/*.js'],
        expand: true
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 5
      },
      generate: {
        cwd: project.res.css.sass,
        src: ['**/*.{scss,sass}'],
        dest: project.res.css.dir,
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
      prefix: {
        cwd: project.res.css.dir,
        src: ['*.css', '!*-IE.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      dataURI: {
        src: [`${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURI}`, `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`],
        dest: `${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`,
      }
    },

    'string-replace': {
      build: {
        options: {
          replacements: [{
            pattern: /@tx-title/gi,
            replacement: project.name
          }, {
            pattern: /@tx-language/gi,
            replacement: project.language
          }, {
            pattern: /(?:<span data-dev-note=".*?">)(.*)(?:<\/span>)/gi,
            replacement: '$1'
          }, {
            pattern: /\sdata-dev-note=".*?"/gi,
            replacement: ''
          }, {
            pattern: new RegExp(`${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}(-IE)*.css`, 'gi'),
            replacement: `${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}$1.min.css`
          }, {
            pattern: new RegExp(`${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.js`, 'gi'),
            replacement: `${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.min.js`
          }, {
            pattern: /(?:\s|\t)*.*tx-debug.*(?:\r?\n|\r)/gi,
            replacement: ''
          }, {
            pattern: /<style type="text\/css">(?:\r?\n|\r)/g,
            replacement: '<style type="text/css">'
          }, {
            pattern: /(?:\r?\n|\r)<\/style>(?:\r?\n|\r)<script(?: id="loadcss")*>(?:\r?\n|\r)/g,
            replacement: '</style>\n    <script type="text/javascript" id="loadcss">'
          }, {
            pattern: /(?:\r?\n|\r)<\/script>(?:\r?\n|\r)<noscript>(?:\r?\n|\r)/g,
            replacement: '</script>\n    <noscript>'
          }, {
            pattern: /(?:\r?\n|\r)<\/noscript>/g,
            replacement: '</noscript>'
          }]
        },
        files: {
          './': [`${project.build.dir}*.html`]
        }
      },
      indentation: {
        options: {
          replacements: [{
            pattern: /(<!-->)(?:\r?\n|\r)(<html.*>)(?:\r?\n|\r)*(?:\s*)(<!--<!\[endif\]-->)/g,
            replacement: '$1 $2 $3'
          }]
        },
        files: {
          './': [`${project.build.dir}*.html`, `${project.dir}*.html`]
        }
      },
      css: {
        options: {
          replacements: [{
            pattern: /\[data-dev-note\](?:.|\r?\n|\r)*?\}(?:\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\/\* line \d*, .* \*\/(?:\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\/\*# sourceMappingURL(?:.|\t|\s|\r?\n|\r)*?\*\//gi,
            replacement: ''
          }, {
            pattern: /.media \-sass\-debug\-info(?:.|\t|\s|\r?\n|\r)*?\}\}/gi,
            replacement: ''
          }, {
            pattern: /\/\*\*\* uncss>.*\*\*\*\/(?:\r?\n|\r)*/g,
            replacement: ''
          }, {
            pattern: /\*\s(?:.)*\*\/(?:\r?\n|\r)*$/g,
            replacement: ''
          }, {
            pattern: /\*\s(?:.)*\*\/(?:\r?\n\t*|\r\t*)*\//g,
            replacement: ''
          }, {
            pattern: /(?:\r?\n|\r)*\/$/g,
            replacement: ''
          }, {
            pattern: /\/\*(?:.)*(?:\r?\n|\r){4}/g,
            replacement: ''
          }, {
            pattern: /\{(?:\r?\n|\r)\s*\/\*/g,
            replacement: '{\n\n  /*'
          }, {
            pattern: /\}(?:\r?\n|\r)\}/g,
            replacement: '}\n\n}'
          }]
        },
        files: {
          './': [`${project.res.css.dir}*.css`, `!${project.res.css.dir}*.min.css`]
        }
      },
      jsHint: {
        options: {
          replacements: [{
            pattern: /(?:\r?\n|\r)(?:\s)*\/\* (?:jshint|global|exports).*\*\//g,
            replacement: ''
          }]
        },
        files: {
          './': [`${project.res.js.dir}*.js`, `!${project.res.js.dir}*.min.js`]
        }
      }
    },

    browserify: {
      bundle: {
        options: {
          transform: [['babelify', {'presets': ['es2015']}]]
        },
        cwd: project.res.js.devDir,
        src: ['*.js'],
        dest: project.res.js.dir,
        expand: true
      }
    },
    removelogging: {
      optimize: {
        cwd: project.res.js.dir,
        src: ['*.js'],
        dest: project.res.js.dir,
        expand: true
      }
    },
    fixmyjs: {
      options: {
        config: '.jshintrc'
      },
      optimize: {
        cwd: project.res.js.dir,
        src: ['*.js'],
        dest: project.res.js.dir,
        expand: true
      }
    },
    uglify: {
      options: {
        preserveComments: false
      },
      optimize: {
        cwd: project.res.js.dir,
        src: ['*.js'],
        dest: project.res.js.dir,
        ext: '.min.js',
        expand: true
      }
    },

    uncss: {
      options: {
        ignore: [/.*-is-.*/, /.*-has-.*/, /.*-are-.*/, /mdz-.*/, /js-.*/],
        timeout: 1000
      },
      optimize: {
        files: {
          [`${project.res.css.dir}${project.res.css.filename}.css`]: `${project.dir}*.html`
        }
      }
    },
    csscomb: {
      options: {
        config: '.csscombrc'
      },
      optimize: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },
    cssc: {
      options: grunt.file.readJSON('.csscrc'),
      optimize: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        ext: '.min.css',
        expand: true
      }
    },
    critical: {
      options: {
        css: project.res.css.dir + project.res.css.filename + '.css',
        dimensions: [{
          width: project.build.critical.widthDesktop,
          height: project.build.critical.heightDesktop,
        }, {
          width: project.build.critical.widthMobile,
          height: project.build.critical.heightMobile,
        }],
        minify: true,
        extract: false
      },
      optimize: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      }
    },
    cssmin: {
      optimize: {
        cwd: project.res.css.dir,
        src: ['*.min.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },

    processhtml: {
      options: {
        includeBase: project.res.templates.comp,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.res.templates.dir,
        src: ['*.html', '!* copy*.html', '!* - Copy*.html'],
        dest: project.dir,
        expand: true
      }
    },
    htmlmin: {
      options: grunt.file.readJSON('.htmlminrc'),
      optimize: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      }
    },
    prettify: {
      options: {
        config: '.jsbeautifyrc'
      },
      build: {
        cwd: project.build.dir,
        src: ['*.html'],
        dest: project.build.dir,
        expand: true
      },
      dev: {
        cwd: project.dir,
        src: ['*.html'],
        dest: project.dir,
        expand: true
      }
    },

    sprite: (_ => {
      var tasks = {};
      var spritePath = project.res.images.dir;
      var imgPath = `../${spritePath.replace(project.res.dir, '')}`;
      project.res.images.sprites.forEach(sprite => {
        var name = sprite.split('.')[0];
        var ext = sprite.split('.')[1];
        project.res.images.desities.forEach(density => {
          var densitySuffix = density === 1 ? '' : `@${density}x`;
          var directoryPath = `${spritePath}${name}${densitySuffix}/`;
          if (grunt.file.exists(directoryPath)) {
            let taskName = `${name}${densitySuffix}`;
            tasks[taskName] = {
              src: `${directoryPath}*.${ext}`,
              dest: `${spritePath}${name}${densitySuffix}.${ext}`,
              destCss: `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}${densitySuffix}.scss`,
              imgPath: `${imgPath}${name}${densitySuffix}.${ext}`,
              padding: 5 * density,
              cssSpritesheetName: `ssh-${name}${densitySuffix.replace('@', '-')}`,
              cssVarMap(item) {
                item.name = `spt-${item.name}`;
              },
              cssOpts: {
                functions: false,
                variableNameTransforms: []
              }
            };
          }
        });
      });
      return tasks;
    })(),
    datauri: {
      options: {
        classPrefix: 'image-'
      },
      images: (_ => {
        var tasks = {
          src: [],
          dest: `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURI}`
        };
        project.res.images.dataURI.forEach(image => tasks.src.push(`${project.res.images.dir}${image}`));
        return tasks;
      })()
    },
    imagemin: {
      options: {
        optimizationLevel: 3,
        svgoPlugins: [{
          removeViewBox: false
        }]
      },
      images: {
        cwd: project.dir,
        src: [`**/*.${helpers.imageFiles}`, `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`, ...helpers.dontCopy],
        dest: project.dir,
        expand: true
      },
      meta: {
        cwd: project.build.dir,
        src: [`*.${helpers.imageFiles}`],
        dest: project.build.dir,
        expand: true
      }
    },

    clean: {
      res: [project.res.css.dir, `${project.res.js.dir}*.js`],
      images: [`${project.res.css.sass}${helpers.scss}${helpers.temp}`],
      reports: [`*.css`],
      build: [project.build.dir]
    },
    cleanempty: {
      options: {
        noJunk: true
      },
      build: {
        src: [`${project.build.dir}**/*`]
      }
    },
    copy: {
      build: {
        cwd: project.dir,
        src: ['**/*.*', `!${project.res.templates.dir.replace(project.dir, '')}/**`, `!${project.res.css.sass.replace(project.dir, '')}/**`, ...helpers.dontCopy, ...helpers.sprites],
        dest: project.build.dir,
        expand: true
      },
      meta: {
        cwd: project.meta,
        src: ['**/*.*'],
        dest: project.build.dir,
        expand: true
      }
    },
    compress: {
      res: {
        options: {
          mode: 'gzip'
        },
        cwd: project.build.dir,
        src: ['**/*.min.{css,js}'],
        dest: project.build.dir,
        ext: '.gz',
        extDot: 'last',
        expand: true
      }
    },

    connect: {
      options: {
        keepalive: true,
        port: 8000
      },
      dev: {
        options: {
          base: project.dir
        }
      },
      build: {
        options: {
          base: project.build.dir
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: [`${project.res.templates.dir}**/*.html`],
        tasks: ['processhtml']
      },
      images: {
        files: [`**/*.${helpers.imageFiles}`],
        tasks: ['sass', 'autoprefixer', 'processhtml']
      },
      sass: {
        files: [project.res.css.sass + '**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      javascript: {
        files: [project.res.js.devDir + '**/*.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [`${project.dir}*.html`, `${project.res.css.dir}**/*.css`, `${project.res.js.dir}**/*.{js,json}`, `${project.dir}**/*.${helpers.imageFiles}`]
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 5
      },
      projectWatch: ['watch:html', 'watch:images', 'watch:sass', 'watch:javascript', 'watch:livereload']
    }

  });

  grunt.registerTask('dataURIFallback', 'Fallback classes for the images in DataURI', _ => {
    var scssIE = '';
    project.res.images.dataURI.forEach(file => {
      if (grunt.file.isFile(`${project.res.images.dir}${file}`)) {
        scssIE += `%ie-image-${file.split('.')[0]} {\n  background-image: url(${project.res.images.dir.replace(project.res.dir, '../')}${file});\n}\n\n`;
      }
    });
    if (scssIE !== '') {
      grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`, scssIE);
    }
  });

  grunt.registerTask('dataURICleanup', 'Cleanup DataURI placeholders', _ => {
    var scss = grunt.file.read(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`).replace(/"/gm, '').replace(/\t/gm, '  ').replace(/\n\n$/gm, '\n');
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`, scss);
  });

  grunt.registerTask('spritesSCSS', 'SCSS variables with sprites data', _ => {
    if (project.res.images.sprites.length > 0) {
      var scss = '';
      grunt.file.delete(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`);
      project.res.images.sprites.forEach(sprite => {
        var fullName = sprite.split('.');
        var name = fullName[0];
        var ext = fullName[1];
        var scssPath = `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}`;
        project.res.images.desities.forEach(density => {
          var densitySuffix = density === 1 ? '' : `@${density}x`;
          var scssFile = `${scssPath}${densitySuffix}.scss`;
          if (grunt.file.isFile(scssFile)) {
            let scssBlock = grunt.file.read(scssFile).replace(/(?:\r?\n|\r){2,}/gm, '');
            scssBlock = `// ${name}${densitySuffix}.${ext}\n\n${scssBlock}\n\n\n\n`;
            scss += scssBlock;
            grunt.file.delete(scssFile);
          }
        });
      });
      scss = scss.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r)/gm, '').replace(/\, \)/gm, ')').replace(/(\s|\()0px/gm, '$1' + '0');
      scss = scss.replace(/\n\n\n\n$/gm, '\n');
      grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`, scss);
    }
  });

  grunt.registerTask('inlineModernizr', 'Modernizr inlining', _ => {
    var html = grunt.file.read(`${project.build.dir}${project.index}`);
    var modernizrPath = (`${project.build.dir}${html.match(/src=".*Modernizr\/.*?"/gm)}`).replace(/"|'|src=/gm, '');
    var modernizr = (`\n    <script id="modernizr" type="text/javascript">${grunt.file.read(modernizrPath)}</script>`).replace(/\/\*(?:\r?\n|\r|.)*\*\/(?:\r?\n|\r)/gm, '');
    grunt.file.recurse(project.build.dir, (path, root, sub, filename) => {
      var filenameArray = filename.split('.');
      if (filenameArray[(filenameArray.length - 1)] === 'html') {
        let file = (grunt.file.read(path)).replace(/(?:\s|\t)*.*src=".*Modernizr\/.*(?=\r?\n|\r)/gm, modernizr);
        grunt.file.write(path, file);
      }
    });
  });

  grunt.registerTask('reminder', 'Reminder', _ => {
    var list = grunt.file.readJSON('reminders.json').reminders;
    if (list.length > 0) {
      grunt.log.writeln('\nDon\'t Forget to Check:'.magenta);
      list.forEach(reminder => {
        grunt.log.writeln(`${'✔'.green} ${reminder}`);
      });
    }
  });

  grunt.registerTask('compileTasks', 'Compiling', _ => {
    if (project.res.images.sprites.length > 0) {
      grunt.task.run([
        'clean:res',
        'process-sprites',
        'process-images',
        'process-html',
        'process-css',
        'process-js'
      ]);
    } else {
      grunt.task.run([
        'clean:res',
        'process-images',
        'process-html',
        'process-css',
        'process-js'
      ]);
    }
  });

  grunt.registerTask('imageTasks', 'Compiling Images', _ => {
    if (project.res.images.dataURI.length > 0) {
      grunt.task.run([
        'imagemin:images',
        'process-dataURI',
        'clean:images'
      ]);
    } else {
      grunt.task.run([
        'imagemin:images',
        'clean:images'
      ]);
    }
  });

  grunt.registerTask('quality', [
    'htmlhint',
    'arialinter',
    'scsslint',
    'csslint',
    'csscss',
    'colorguard',
    'jscs',
    'jshint',
    'jsinspect',
    'clean:reports'
  ]);

  grunt.registerTask('performance', [
    'analyzecss'
  ]);

  grunt.registerTask('test', [
    'quality',
    'performance',
    'mochaTest'
  ]);

  grunt.registerTask('process-dataURI', [
    'datauri',
    'dataURIFallback',
    'concat:dataURI',
    'dataURICleanup'
  ]);

  grunt.registerTask('process-sprites', [
    'sprite',
    'spritesSCSS'
  ]);

  grunt.registerTask('process-images', [
    'imageTasks'
  ]);

  grunt.registerTask('process-html', [
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'autoprefixer',
    'uncss',
    'csscomb',
    'string-replace:css',
    'cssc',
    'cssmin'
  ]);

  grunt.registerTask('process-js', [
    'browserify',
    'removelogging',
    'fixmyjs',
    'string-replace:jsHint',
    'uglify'
  ]);

  grunt.registerTask('watch-project', [
    'concurrent'
  ]);

  grunt.registerTask('compile', [
    'compileTasks'
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'inlineModernizr'
  ]);

  grunt.registerTask('build-resources', [
    'compile',
    'clean:build',
    'copy',
    'imagemin:meta',
    'htmlmin',
    'prettify',
    'string-replace:indentation',
    'compress',
  ]);

  grunt.registerTask('build-finalize', [
    'string-replace:build',
    'cleanempty',
    'test',
    'reminder'
  ]);

  grunt.registerTask('build', [
    'build-resources',
    'build-finalize'
  ]);

  grunt.registerTask('build-critical', [
    'build-resources',
    'compile-critical',
    'build-finalize'
  ]);

};
