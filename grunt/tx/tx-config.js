module.exports = config => {

  return {

    project: {
      name: config.PROJECT,
      language: config.LANGUAGE,
      browsers: config.BROWSERS,
      meta: `${config.META_DIR}/`,
      dir: `${config.DEVELOPMENT_DIR}/`,
      images: `${config.DEVELOPMENT_DIR}/${config.IMAGES_DIR}/`,
      index: config.INDEX_PAGE,
      res: {
        dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/`,
        templates: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.TEMPLATES_DIR}/`,
          comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.TEMPLATES_DIR}/${config.COMPONENTS_DIR}/`,
        },
        images: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.CSS_IMAGES_DIR}/`,
          sprites: config.SPRITES,
          dataURI: config.DATA_URI,
          desities: config.DENSITIES
        },
        css: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.CSS_DIR}/`,
          sass: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/`,
          comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/${config.COMPONENTS_DIR}/`,
          filename: config.CSS_FILENAME
        },
        js: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DIR}/`,
          devDir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DEV_DIR}/`,
          comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DEV_DIR}/${config.COMPONENTS_DIR}/`,
          bundle: config.JS_BUNDLE,
          service: config.JS_SERVICE
        },
        fonts: {
          dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.FONTS_DIR}/`
        }
      },
      tests: {
        mocha: `${config.TESTS_DIR}/${config.MOCHA_DIR}`,
        phantomcss: {
          dir: `${config.TESTS_DIR}/${config.PHCSS_DIR}`,
          screenshots: `${config.TESTS_DIR}/${config.PHCSS_DIR}/${config.PHCSS_SCREENS_DIR}`,
          results: `${config.TESTS_DIR}/${config.PHCSS_DIR}/${config.PHCSS_RESULTS_DIR}`
        }
      },
      build: {
        dir: config.BUILD_DIR + '/',
        critical: {
          widthDesktop: config.CRITICAL_DESK_W,
          heightDesktop: config.CRITICAL_DESK_H,
          widthMobile: config.CRITICAL_MOBILE_W,
          heightMobile: config.CRITICAL_MOBILE_H
        }
      }
    },

    helpers: {
      txpath: '**/tx/**/*.',
      temp: 'tmp/',
      scss: 'project/',
      spritesSCSS: '_project-sprites.scss',
      dataURISCSS: '_project-images.scss',
      dataURI: '_project-base64.scss',
      dataURIFallback: '_project-imagesIE.scss',
      sprites: config.SPRITES.map(sprite => `!**/${sprite.split('.')[0]}*/*.*`),
      imageFiles: '{png,jpg,jpeg,gif,svg}',
      uncssIgnoreFiles: [
        '404.html'
      ],
      uncssIgnoreClasses: [
        /.*-is-.*/,
        /.*-has-.*/,
        /.*-are-.*/,
        /mdz-.*/,
        /js-.*/,
        /ie\d/
      ],
      dontCopy: [
        '!**/*.map',
        '!**/**-dev/**',
        '!**/tx-*.*',
        '!**/tx/**'
      ]
    }

  };

};
