install:
	npm install

start:
	npm start

develop: start

lint:
	npm run lint
	npx editorconfig-checker

test:
	npx jest --watchAll

test-coverage:
	npx jest --collect-coverage

build:
	npm run build

.PHONY: build
