/* eslint no-sync: 'off' */

const fs = require('fs');
const url = require('url');

function generateSWResponse(error, buffer, res, next) {
  if (error) return next(error);
  const response = {
    headers: {
      'Content-Type': 'text/javascript',
      'Content-Length': buffer.length,
    },
    body: buffer,
  };
  res.writeHead(200, response.headers);
  res.end(response.body);
  return response;
}

function serveSW(res, next, dir, filename) {
  fs.readFile(`${dir}${filename}`, (error, buffer) => generateSWResponse(error, buffer, res, next));
}

function swMiddleware(req, res, next, dir, filename) {
  if (req.url.indexOf(filename) < 0) return next();
  return serveSW(res, next, dir, filename);
}

function generatePagesResponse(error, buffer, res, next) {
  if (error) return next(error);
  const response = {
    headers: {
      'Content-Type': 'text/html',
      'Content-Length': buffer.length,
    },
    body: buffer,
  };
  res.writeHead(200, response.headers);
  res.end(buffer);
  return response;
}

function servePages(res, next, dir, pages) {
  fs.readFile(`${dir}${pages}`, (error, buffer) => generatePagesResponse(error, buffer, res, next));
}

function servePage(res, next, dir, pathname) {
  fs.readFile(`${dir}${pathname}.html`, (error, buffer) => generatePagesResponse(error, buffer, res, next));
}

function is404(dir, pathname) {
  if (pathname === '/') return false;
  if ((!pathname.match(/\.[0-9a-zA-Z]{2,5}$/gu) && !fs.existsSync(`${dir}${pathname}`)) && !fs.existsSync(`${dir}${pathname}.html`)) return true;
  return false;
}

function pagesMiddleware(req, res, next, dir, pages) {
  const reqURL = url.parse(req.url);
  const { pathname } = reqURL;
  if (pathname === '/s' || pathname === '/style') return servePage(res, next, dir, 'style');
  if (pathname === '/t' || pathname === '/typo') return servePage(res, next, dir, 'typography');
  if (pathname === '/p' || pathname === '/pages' || is404(dir, pathname)) return servePages(res, next, dir, pages);
  if (!fs.existsSync(`${dir}${pathname}`) && fs.existsSync(`${dir}${pathname}.html`)) return servePage(res, next, dir, pathname);
  return next();
}

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      debug: true,
      keepalive: true,
      port: project.port,
      protocol: project.https ? 'https' : 'http',
    },
    dev: {
      options: {
        base: project.dir,
        middleware: (connect, connectOptions, middlewares) => {
          const filename = `${project.res.js.service}.min.js`;
          middlewares.unshift((req, res, next) => pagesMiddleware(req, res, next, project.dir, helpers.pages));
          middlewares.unshift((req, res, next) => swMiddleware(req, res, next, project.res.js.dir, filename));
          return middlewares;
        },
      },
    },
    build: {
      options: {
        base: project.build.dir,
        middleware: (connect, connectOptions, middlewares) => {
          const dir = `${project.build.dir}${project.res.js.dir.replace(project.dir)}`;
          const filename = `${project.res.js.service}.min.js`;
          middlewares.unshift((req, res, next) => pagesMiddleware(req, res, next, project.build.dir, helpers.pages));
          middlewares.unshift((req, res, next) => swMiddleware(req, res, next, dir, filename));
          return middlewares;
        },
      },
    },
  };
};
