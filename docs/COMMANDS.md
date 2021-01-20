# Building project with Grunt

Check `gruntfile.js` for project configuration.

Here are the main commands:

## Watch

Run `grunt watch-project-server` to watch project.

```sh
$ npm start
```

## Build

Run `grunt build` to compile resources, collect project into `/build`
and prepare it for deployment.

```sh
$ npm run build
```

Run `grunt build-fast` to build project without running tests or
linters.

```sh
$ npm run build:fast
```

## Process images, scripts, stylesheets and HTML

Run `grunt compile` to generate, optimise and minify images, scripts
([UglifyJS](http://lisperator.net/uglifyjs/)), stylesheets
([autoprefixer](https://github.com/ai/autoprefixer),
[CSScomb](http://csscomb.com/), etc.) and HTML-files.

```sh
$ npm run compile
```

Run `grunt process-sprites` to compile sprites

```sh
$ npm run sprites
```

## Linting & testing

Run `grunt quality` to lint project's stylesheets ([CSS Lint](http://csslint.net) and
[CSS Colorguard](https://github.com/SlexAxton/css-colorguard)),
scripts ([ESLint](http://eslint.org/)), HTML-files ([HTMLHint](http://htmlhint.com/)).

```sh
$ npm run quality
```

Run `grunt test` to run unit tests.

```sh
$ npm run test
```
