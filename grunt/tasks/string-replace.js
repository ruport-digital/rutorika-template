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
          pattern: / +data-dev-note=".*?"/gi,
          replacement: ''
        }, {
          pattern: new RegExp(`${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}(-IE)*.css`, 'gi'),
          replacement: `${project.res.css.dir.replace(project.dir, '')}${project.res.css.filename}$1.min.css`
        }, {
          pattern: new RegExp(`${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.js`, 'gi'),
          replacement: `${project.res.js.dir.replace(project.dir, '')}${project.res.js.bundle}.min.js`
        }, {
          pattern: /<style type="text\/css">(?:\r?\n|\r)/gi,
          replacement: '<style type="text/css">'
        }, {
          pattern: /(?:\r?\n|\r)<\/style>(?:\r?\n|\r)<script(?: id="loadcss")*>(?:\r?\n|\r)/gi,
          replacement: '</style>\n    <script type="text/javascript" id="loadcss">'
        }, {
          pattern: /(?:\r?\n|\r)<\/script>(?:\r?\n|\r)<noscript>(?:\r?\n|\r)/gi,
          replacement: '</script>\n    <noscript>'
        }, {
          pattern: /(?:\r?\n|\r)<\/noscript>/gi,
          replacement: '</noscript>'
        }]
      },
      files: {
        './': [`${project.build.dir}*.html`]
      }
    },
    css: {
      options: {
        replacements: [{
          pattern: /\*(?! *csslint|\/)[^*{]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r|\t| )*\//g,
          replacement: ''
        }, {
          pattern: /\/\*.*(?:# sourceMappingURL|uncss>)[\s\S]*?\*\/(?:\r?\n|\r)*/g,
          replacement: ''
        }, {
          pattern: /(@media.*\{|(?:\*\/|\})\n(?=\}))/g,
          replacement: '$1\n'
        }, {
          pattern: /^(?:(?: |\t)*(?:\r?\n|\r))+/g,
          replacement: ''
        }, {
          pattern: /(?:(?: |\t)*(?:\r?\n|\r))+$/g,
          replacement: '\n'
        }, {
          pattern: /((?:\s{2}|\t{1})\}\n)(\s{2}|\t{1})/g,
          replacement: '$1\n$2'
        }, {
          pattern: /\*\//g,
          replacement: '*/\n'
        }]
      },
      files: {
        './': [`${project.res.css.dir}*.css`, `!${project.res.css.dir}*.min.css`]
      }
    },
    js: {
      options: {
        replacements: [{
          pattern: /((?:\r?\n|\r)+\/\* jshint[\s\S]*?\*\/)/g,
          replacement: '\n$1'
        }]
      },
      files: {
        './': [`${project.res.js.dir}*.js`, `!${project.res.js.dir}*.min.js`]
      }
    }
  };

};
