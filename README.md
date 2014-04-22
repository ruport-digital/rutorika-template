Template X is a basic template for developing web sites.

Designed specifically to improve front-end developer's workflow, by providing basic
structure, foundtation and customizable building tools for your project. You'll be
able to start develop right away, just clone the repo.

`git clone https://github.com/uncleF/TemplateX.git`

Source: [https://github.com/uncleF/TemplateX](https://github.com/uncleF/TemplateX)


## Features

* HTML5 ready.
* Cross-browser compatible (Chrome, Firefox, IE7+, Opera, Safari).
* Includes [jQuery](http://jquery.com/).
* Uses [Modernizr](http://modernizr.com/) for feature detection.
* Basic placeholder CSS Media Queries.
* Default basic print CSS.
* Handfull of CSS utility classes.
* Very basic debuging JavaScript script.
* Development, testing & building tool based on Grunt.JS.


## Building project

### Building with Grunt.JS

Template X uses [Grunt.JS](http://gruntjs.com/) as a primary task runner.

* [Getting started with Grunt.JS](http://gruntjs.com/getting-started).

To be able to use Grunt.JS in your project, first run `npm install`, to install
all the dependencies and check `gruntfile.js` for basic project configuration
options.

#### Build Project – grunt build

Run `grunt build`, compile and compress CSS and JavaScript, collect built project
into `/build` and update paths in all the HTML files.

#### Compile JavaScript and CSS resources – grunt compile

Run `grunt compile` to just concatenate, remove logging from and minify
JavaScript files; and to generate CSS, concatenate it, remove Sass debug info from it,
optimize, sort rules in and minify CSS files.
Uses [UglifyJS](http://lisperator.net/uglifyjs/), [grunt-sass](https://github.com/sindresorhus/grunt-sass),
[autoprefixer](https://github.com/ai/autoprefixer) and [CSScomb](http://csscomb.com/).

#### Optimize all and generate Data URIs from selected images – grunt images

Run `grunt images` to optimize all the images, and convert specific ones to Data URIs.

#### Check HTML, JavaScript and CSS – grunt lint

Run `grunt lint` to check HTML ([HTMLHint](http://htmlhint.com/)),
JavaScript ([JSHint](http://jshint.com)) and CSS ([CSS Lint](http://csslint.net))
files for bad code, potencial bugs and syntax inconsistencies.

#### Test page performance – grunt test

Run `grunt test` to test page performance. Uses [grunt-yslow](https://github.com/andyshora/grunt-yslow)