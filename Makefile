install:
	npm install

start:
	npm start

develop: start

lint:
	npx editorconfig-checker
	npm run lint

test:
	npx jest --watchAll

build:
	npm run build

.PHONY: build
