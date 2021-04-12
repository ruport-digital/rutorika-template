# Rutorika Template

## Development setup

Check `gruntfile.js` for project configuration.

Here are the main commands:

## Watch

Run `grunt watch-project` to watch project.

```sh
$ grunt watch-project
```

## Build

Run `grunt build` to compile resources, collect project into `/build`
and prepare it for deployment.

```sh
$ grunt build
```

Run `grunt build-fast` to build project without running tests or
linters.

```sh
$ grunt build-fast
```

## Process images, scripts, stylesheets and HTML

Run `grunt compile` to generate, optimise and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML-files.

```sh
$ grunt compile
```

Run `grunt process-sprites` to compile sprites

```sh
$ grunt process-sprites
```

## Linting & testing

Run `grunt quality` to lint project's stylesheets ([CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([ESLint](http://eslint.org/)), HTML-files ([HTMLHint](http://htmlhint.com/)).

```sh
$ grunt quality
```

Run `grunt test` to run unit tests.

```sh
$ grunt test
```
