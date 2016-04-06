# Building project with Grunt

Check `gruntfile.js` for basic configuration options.

Here are the main commands:

## Watch

Run `grunt concurrent` to watch project.

```sh
$ grunt concurrent
```

## Build

Run `grunt build` to compile resources, collect project into `/build`
and prepare it for deployment.

```sh
$ grunt build
```

Run `grunt build-critical` to build project and optimize it's critical
rendering path.

```sh
$ grunt build-critical
```

## Process images, scripts, stylesheets and HTML

Run `grunt compile` to generate, optimize and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML-files.

```sh
$ grunt compile
```

## Linting & testing

Run `grunt quality` to lint project's stylesheets ([CSS Lint](http://csslint.net) and
[CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([JSHint](http://jshint.com)), HTML-files ([HTMLHint](http://htmlhint.com/))
and general accesibility ([AriaLinter](https://github.com/globant-ui/arialinter)).

```sh
$ grunt quality
```

Run `grunt performance` to check project for potential performance issues.

```sh
$ grunt performance
```

Run `grunt test` to run unit tests.

```sh
$ grunt performance
```
