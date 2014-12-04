# Building project with Grunt

To be able to use Grunt within your project first run `npm install -g grunt`
& `npm install` to install all of the dependencies. Then check
`gruntfile.js` for basic configuration options.

Here are the main commands:

## Watch project

Run `grunt concurrent` to watch project.

```sh
$ grunt concurrent
```

## Build project

Run `grunt build` to compile current project, collect it into `/build`
and prepare for development.

```sh
$ grunt build
```

Run `grunt build-critical` to build project and optimize its critical
rendering path.

```sh
$ grunt build-critical
```

## Process images, scripts, stylesheets and HTML

Run `grunt compile` to generate, optimize and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML.

```sh
$ grunt compile
```

## Optimize all and generate Data URIs from selected images

Run `grunt images` to optimize all the project images and generate Data URIs
from specified ones.

```sh
$ grunt images
```

## Lint scripts, stylesheets, HTML and general accessibility

Run `grunt quality` to lint stylesheets ([CSS Lint](http://csslint.net) and
[CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([JSHint](http://jshint.com)), HTML ([HTMLHint](http://htmlhint.com/)) and
project's accesibility ([AriaLinter](https://github.com/globant-ui/arialinter)).

```sh
$ grunt quality
```

## Test project for performance issue

Run `grunt performance` to locally test project for potential performance
issues.

```sh
$ grunt performance
```
