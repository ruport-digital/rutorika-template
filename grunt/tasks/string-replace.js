module.exports = (grunt, options) => {

  var project = options.project;

  return {
    build: {
      options: {
        replacements: [{
          pattern: /@tx-title/gi,
          replacement: project.name
        }, {
          pattern: /@tx-language/gi,
          replacement: project.language
        }, {
          pattern: /(?:<span data-dev-note=".*?">)(.*)(?:<\/span>)/gi,
          replacement: '$1'
        }, {
          pattern: /\sdata-dev-note=".*?"/gi,
          replacement: ''
        }, {
          pattern: new RegExp(`${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}(-IE)*.css`, 'gi'),
          replacement: `${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}$1.min.css`
        }, {
          pattern: new RegExp(`${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.js`, 'gi'),
          replacement: `${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.min.js`
        }, {
          pattern: /(?:\s|\t)*.*tx-debug.*(?:\r?\n|\r)/gi,
          replacement: ''
        }, {
          pattern: /<style type="text\/css">(?:\r?\n|\r)/g,
          replacement: '<style type="text/css">'
        }, {
          pattern: /(?:\r?\n|\r)<\/style>(?:\r?\n|\r)<script(?: id="loadcss")*>(?:\r?\n|\r)/g,
          replacement: '</style>\n    <script type="text/javascript" id="loadcss">'
        }, {
          pattern: /(?:\r?\n|\r)<\/script>(?:\r?\n|\r)<noscript>(?:\r?\n|\r)/g,
          replacement: '</script>\n    <noscript>'
        }, {
          pattern: /(?:\r?\n|\r)<\/noscript>/g,
          replacement: '</noscript>'
        }]
      },
      files: {
        './': [`${project.build.dir}*.html`]
      }
    },
    indentation: {
      options: {
        replacements: [{
          pattern: /(<!-->)(?:\r?\n|\r)(<html.*>)(?:\r?\n|\r)*(?:\s*)(<!--<!\[endif\]-->)/g,
          replacement: '$1 $2 $3'
        }]
      },
      files: {
        './': [`${project.build.dir}*.html`, `${project.dir}*.html`]
      }
    },
    css: {
      options: {
        replacements: [{
          pattern: /\[data-dev-note\](?:.|\r?\n|\r)*?\}(?:\r?\n|\r)*/g,
          replacement: ''
        }, {
          pattern: /\/\* line \d*, .* \*\/(?:\r?\n|\r)*/g,
          replacement: ''
        }, {
          pattern: /\/\*# sourceMappingURL(?:.|\t|\s|\r?\n|\r)*?\*\//gi,
          replacement: ''
        }, {
          pattern: /.media \-sass\-debug\-info(?:.|\t|\s|\r?\n|\r)*?\}\}/gi,
          replacement: ''
        }, {
          pattern: /\/\*\*\* uncss>.*\*\*\*\/(?:\r?\n|\r)*/g,
          replacement: ''
        }, {
          pattern: /\*\s(?:.)*\*\/(?:\r?\n|\r)*$/g,
          replacement: ''
        }, {
          pattern: /\*\s(?:.)*\*\/(?:\r?\n\t*|\r\t*)*\//g,
          replacement: ''
        }, {
          pattern: /(?:\r?\n|\r)*\/$/g,
          replacement: ''
        }, {
          pattern: /\/\*(?:.)*(?:\r?\n|\r){4}/g,
          replacement: ''
        }, {
          pattern: /\{(?:\r?\n|\r)\s*\/\*/g,
          replacement: '{\n\n  /*'
        }, {
          pattern: /\}(?:\r?\n|\r)\}/g,
          replacement: '}\n\n}'
        }]
      },
      files: {
        './': [`${project.res.css.dir}*.css`, `!${project.res.css.dir}*.min.css`]
      }
    },
    jsHint: {
      options: {
        replacements: [{
          pattern: /(?:\r?\n|\r)(?:\s)*\/\* (?:jshint|global|exports).*\*\//g,
          replacement: ''
        }]
      },
      files: {
        './': [`${project.res.js.dir}*.js`, `!${project.res.js.dir}*.min.js`]
      }
    }
  };

};
