# Building project with Grunt

To be able to use Grunt within your project first run `npm install -g grunt`
& `npm install` to install all of the dependencies. Then check
`gruntfile.js` for basic configuration options.

Here are the main commands:

## Watch project

```sh
$ grunt concurrent
```

Run `grunt concurrent` to watch project.

## Build project

```sh
$ grunt build
```

Run `grunt build` to compile current project, collect it into `/build`
and prepare for development.

```sh
$ grunt build-critical
```

Run `grunt build-critical` to build project and optimize its critical
rendering path.

## Process images, scripts, stylesheets and HTML

```sh
$ grunt compile
```

Run `grunt compile` to generate, optimize and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML.

## Optimize all and generate Data URIs from selected images

```sh
$ grunt images
```

Run `grunt images` to optimize all the project images and generate Data URIs
from specified ones.

## Lint scripts, stylesheets, HTML and general accessibility

```sh
$ grunt quality
```

Run `grunt quality` to lint stylesheets ([CSS Lint](http://csslint.net) and
[CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([JSHint](http://jshint.com)), HTML ([HTMLHint](http://htmlhint.com/)) and
project's accesibility ([AriaLinter](https://github.com/globant-ui/arialinter)).

## Test project for performance issue

```sh
$ grunt performance
```

Run `grunt performance` to locally test project for potential performance
issues.
