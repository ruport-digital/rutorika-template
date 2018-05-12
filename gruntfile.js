/* eslint no-multi-spaces: 'off' */

const CONFIG = {
  PROJECT: 'TemplateX',              // Project Name
  LANGUAGE: 'ru',                    // Language
  AMP: false,                        // Google AMP
  THEME: '#fd746c',                  // Theme Color
  PORT: 3000,                        // Server Port

  DEVELOPMENT_DIR: 'dev',            // Development
  BUILD_DIR: 'build',                // Build
  META_DIR: 'meta',                  // Meta Content

  TESTS_DIR: 'tests',                // Tests
  MOCHA_DIR: 'mocha',                // Mocha
  PHCSS_DIR: 'phantomcss',           // PhantomCSS
  PHCSS_SCREENS_DIR: 'screenshots',  // PhantomCSS Screenshots
  PHCSS_RESULTS_DIR: 'results',      // PhantomCSS Results

  IMAGES_DIR: 'images',              // Content Images

  RESOURCES_DIR: 'res',              // Resources
  COMPONENTS_DIR: 'components',      // Components

  TEMPLATES_DIR: 'templates',        // Templates
  INDEX_PAGE: 'index.html',          // Index Page
  CRITICAL_DESK_W: 1280,             // Critical Width on Desktop
  CRITICAL_DESK_H: 800,              // Critical Height on Desktop
  CRITICAL_MOBILE_W: 320,            // Critical Width on Mobile
  CRITICAL_MOBILE_H: 640,            // Critical Height on Mobile

  CSS_IMAGES_DIR: 'images',          // CSS Images
  SOURCE_IMAGES_DIR: 'sources',      // CSS Images
  SPRITES: [],                       // CSS Images that Should be Compiled into Separate Sprite Sheets
  DATA_URI: [],                      // CSS Images that Should be Converted into DataURI
  DENSITIES: [1, 2, 3],              // Pixel Densities

  SASS_DIR: 'sass',                  // Sass
  CSS_DIR: 'css',                    // CSS

  JS_DEV_DIR: 'js-dev',              // Development JavaScript
  JS_DIR: 'js',                      // JavaScript
  JS_SERVICE: 'service',             // JavaScript Filename

  FONTS_DIR: 'fonts',                // Fonts
};

const loadConfig = require('load-grunt-config');
const configPath = `${process.cwd()}/grunt/tasks/`;
const staticMappings = require('./grunt/tx/tx-mapping');
const data = require('./grunt/tx/tx-config')(CONFIG);

module.exports = (grunt) => {
  loadConfig(grunt, { configPath, jitGrunt: { staticMappings }, data });
  loadConfig(grunt, { jitGrunt: true, init: false, data });
};
