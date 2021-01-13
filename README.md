# [Rutorika Template](https://github.com/ruport-digital/rutorika-template)

## Overview

You'll be able to start develop right away — clone the
repo.

```sh
$ git clone https://github.com/ruport-digital/rutorika-template
```

Check [INSTALL.md](docs/INSTALL.md) to verify if your development
environment ready and [COMMANDS.md](docs/COMMANDS.md) for the list of
available commands.

## Features

* HTML5 ready.
* Cross-browser compatible baseline CSS styles build using robust Sass framework.
* Common basic Media Queries.
* Basic print stylesheet.
* Boilerplate Service Worker.
* Boilerplate WebApp manifest.
* Uses [Modernizr](http://modernizr.com/) for feature detection.
* Uses [Grunt](http://gruntjs.com/) as it's task runner ([Getting started with Grunt.JS](http://gruntjs.com/getting-started)).

## Common issues
> ERR! Failed at the node-sass postinstall script 'node scripts/build.js'

Try to install this:
```sh
sudo apt install -y build-essential gcc make libpng-dev
```
And make sure python2 is installed
