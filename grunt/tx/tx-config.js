/* eslint no-sync: "off" */

const fs = require('fs');

module.exports = config => ({
  project: {
    name: config.PROJECT,
    language: config.LANGUAGE,
    amp: config.AMP,
    theme: config.THEME,
    https: config.HTTPS,
    port: config.PORT,
    browsers: fs.readFileSync('./browserslist', 'utf8').split(/(?:\r?\n|\r)/g).slice(0, -1),
    branch: 'dev',
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
        sources: `${config.SOURCE_IMAGES_DIR}/`,
        sprites: config.SPRITES,
        dataURI: config.DATA_URI,
        densities: config.DENSITIES,
      },
      css: {
        dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.CSS_DIR}/`,
        sass: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/`,
        comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.SASS_DIR}/${config.COMPONENTS_DIR}/`,
      },
      js: {
        dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DIR}/`,
        devDir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DEV_DIR}/`,
        comp: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.JS_DEV_DIR}/${config.COMPONENTS_DIR}/`,
        service: config.JS_SERVICE,
      },
      fonts: {
        dir: `${config.DEVELOPMENT_DIR}/${config.RESOURCES_DIR}/${config.FONTS_DIR}/`,
      },
    },
    tests: {
      mocha: `${config.TESTS_DIR}/${config.MOCHA_DIR}`,
      phantomcss: {
        dir: `${config.TESTS_DIR}/${config.PHCSS_DIR}`,
        screenshots: `${config.TESTS_DIR}/${config.PHCSS_DIR}/${config.PHCSS_SCREENS_DIR}`,
        results: `${config.TESTS_DIR}/${config.PHCSS_DIR}/${config.PHCSS_RESULTS_DIR}`,
      },
    },
    build: {
      dir: `${config.BUILD_DIR}/`,
      critical: {
        widthDesktop: config.CRITICAL_DESK_W,
        heightDesktop: config.CRITICAL_DESK_H,
        widthMobile: config.CRITICAL_MOBILE_W,
        heightMobile: config.CRITICAL_MOBILE_H,
      },
    },
  },

  helpers: {
    txpath: '**/tx/**/*.',
    temp: 'tmp/',
    scss: 'project/',
    externalResources: [
      'node_modules/',
      'bower_components/',
    ],
    spritesSCSS: '_project-sprites.scss',
    dataURISCSS: '_project-images.scss',
    dataURI: '_project-base64.scss',
    dataURIFallback: '_project-imagesIE.scss',
    imageFiles: '{png,jpg,jpeg,gif,webp,svg}',
    imageJpegFiles: '{jpg,jpeg}',
    imagePngFiles: 'png',
    imageRasterFiles: 'png,jpg,jpeg,gif,webp',
    imageVectorFiles: 'svg',
    uncssIgnoreFiles: [
      '404.html',
    ],
    uncssIgnoreClasses: [
      /.*-is-.*/,
      /.*-has-.*/,
      /.*-are-.*/,
      /mdz-.*/,
      /js-.*/,
      /ie\d/,
    ],
    dontCopy: [
      '!**/*.map',
      '!**/**-dev/**',
      '!**/tx-*.*',
      '!**/_tx-*.*',
      '!**/tx/**',
    ],
    pages: '_tx-pages.html',
  },
});
