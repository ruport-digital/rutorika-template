# Building project with Grunt

Check `gruntfile.js` for project configuration.

Here are the main commands:

## Watch

Run `grunt watch-project-server` to watch project.

```sh
$ npx grunt watch-project-server
```

## Build

Run `grunt build` to compile resources, collect project into `/build`
and prepare it for deployment.

```sh
$ npx grunt build
```

Run `grunt build-fast` to build project without running tests or
linters.

```sh
$ npx grunt build-fast
```

## Process images, scripts, stylesheets and HTML

Run `grunt compile` to generate, optimise and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML-files.

```sh
$ npx grunt compile
```

Run `grunt process-sprites` to compile sprites

```sh
$ npx grunt process-sprites
```

## Linting & testing

Run `grunt quality` to lint project's stylesheets ([CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([ESLint](http://eslint.org/)), HTML-files ([HTMLHint](http://htmlhint.com/)).

```sh
$ npx grunt quality
```

Run `grunt test` to run unit tests.

```sh
$ npx grunt test
```
