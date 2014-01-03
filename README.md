Template X is a basic template for developing web sites.

Designed specifically to improve front-end developer's workflow, by providing basic
structure, foundtation and customizable building tools for the project. You'll be
able to start developing right away, just clone the repo.

`git clone https://github.com/uncleF/TemplateX.git`

Source: [https://github.com/uncleF/TemplateX](https://github.com/uncleF/TemplateX)

## Features

* HTML5 ready.
* Cross-browser compatible (Chrome, Firefox, IE7+, Opera, Safari).
* Designed with progressive enhancement in mind.
* Includes [jQuery](http://jquery.com/).
* Uses [Modernizr](http://modernizr.com/) for feature detection.
* Basic placeholder CSS Media Queries.
* Default print CSS.
* Handfull of CSS utility classes.
* Very basic debuging JavaScript script.
* 2 building tools based on Grunt.JS and Apache ANT.

## Building project

### Building with Grunt.JS

Template X uses Grunt.JS[http://gruntjs.com/] as a primary task runner.

* [Getting started with Grunt.JS](http://gruntjs.com/getting-started).

To be able to use Grunt.JS in your project, first run `npm install`, to install
all the dependencies.

Check `gruntfile.js` for basic project configuration options like CSS files order,
directories structure and etc.

#### Build Project - grunt build.

Run `grunt build` to check, compile and compress CSS and JavaScript,
optimize meta images, copy newly built project into `/build` and update paths in
all the HTML files.

#### Compile JavaScript and CSS resources - grunt compile.

Run `grunt compile` to concatenate, remove logging from and minify JavaScript;
and to concatenate, remove Sass debug info from, optimize, sort rules in and
minify CSS. Uses [UglifyJS](http://lisperator.net/uglifyjs/) and [CSScomb](http://csscomb.com/).

#### Optimize images - grunt images.

Run `grunt images` to optimize all images in the project.

#### Check HTML, JavaScript and CSS - grunt lint.

Run `grunt lint` to check HTML ([HTMLHint](http://htmlhint.com/)), JavaScript ([JSHint](http://jshint.com))
and CSS ([CSS Lint](http://csslint.net)) files for bad code, potencial bugs and
syntax inconsistencies.

### Building with Apache ANT.

As an option Template X also includes `build.xml` for building project using [Apache ANT](http://ant.apache.org/).

* [Getting started with Apache ANT](http://ant.apache.org/manual/index.html).

Before using this builder you'll have to update `build.xml`, to include relevant
paths to copies of [YUI Compressor](http://yui.github.io/yuicompressor/),
[Rhino](https://developer.mozilla.org/en/docs/Rhino) and [JSHint](http://jshint.com).

`build.xml` also contains basic project configuration options like CSS files order,
directories structure and etc.

After that just run `ant` to check JavaScript, compile and compress CSS and
JavaScript, copy newly built project into `/build` and update paths in all the
HTML files. USES [YUI Compressor](http://yui.github.io/yuicompressor/),
[Rhino](https://developer.mozilla.org/en/docs/Rhino) and [JSHint](http://jshint.com).