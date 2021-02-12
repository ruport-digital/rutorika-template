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

## Basic commands

### Setup
```sh
make install
```

### Run
```sh
make start
```

### Run lint
```sh
make lint
```

### Build
```sh
make build
```
## Common issues
> ERR! Failed at the node-sass postinstall script 'node scripts/build.js'

Try to install this:

```sh
sudo apt install -y build-essential gcc make libpng-dev
```

And make sure python2 is installed

```sh
sudo apt install python2
```
