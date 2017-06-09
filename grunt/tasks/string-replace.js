module.exports = (grunt, options) => {
  const { project } = options;

  return {
    html: {
      options: {
        replacements: [{
          pattern: /@tx-title/gi,
          replacement: project.name,
        }, {
          pattern: /@tx-language/gi,
          replacement: project.language,
        }, {
          pattern: / +@tx-amp/gi,
          replacement: project.amp ? ' amp' : '',
        }, {
          pattern: /@tx-theme/gi,
          replacement: project.theme,
        }, {
          pattern: /(\n{2,})(\s{3,})/gi,
          replacement: '\n$2',
        }, {
          pattern: /(\n{2,})(\s{2,}<\/)/gi,
          replacement: '\n$2',
        }, {
          pattern: /(?:<span data-dev-note=".*?">)(.*)(?:<\/span>)/gi,
          replacement: '$1',
        }, {
          pattern: / +data-dev-note=".*?"/gi,
          replacement: '',
        }],
      },
      files: {
        './': `${project.dir}*.html`,
      },
    },
    css: {
      options: {
        replacements: [{
          pattern: /\*(?! *csslint|\/)[^*{]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r|\t| )*\//g,
          replacement: '',
        }, {
          pattern: /\/\*.*(?:# sourceMappingURL|uncss>)[\s\S]*?\*\/(?:\r?\n|\r)*/g,
          replacement: '',
        }, {
          pattern: /(@media.*\{|(?:\*\/|\})\n(?=\}))/g,
          replacement: '$1\n',
        }, {
          pattern: /^(?:(?: |\t)*(?:\r?\n|\r))+/g,
          replacement: '',
        }, {
          pattern: /(?:(?: |\t)*(?:\r?\n|\r))+$/g,
          replacement: '\n',
        }, {
          pattern: /((?:\s{2}|\t{1})\}\n)(\s{2}|\t{1})/g,
          replacement: '$1\n$2',
        }, {
          pattern: /\*\//g,
          replacement: '*/\n',
        }],
      },
      files: {
        './': [`${project.res.css.dir}*.css`, `!${project.res.css.dir}*.min.css`],
      },
    },
    js: {
      options: {
        replacements: [{
          pattern: /((?:\r?\n|\r)+\/\* eslint[\s\S]*?\*\/)/g,
          replacement: '\n$1',
        }, {
          pattern: /"use strict";/g,
          replacement: '\n"use strict";',
        }],
      },
      files: {
        './': [`${project.res.js.dir}*.js`, `!${project.res.js.dir}*.min.js`],
      },
    },
    build: {
      options: {
        replacements: [{
          pattern: /@tx-title/gi,
          replacement: project.name,
        }, {
          pattern: /@tx-language/gi,
          replacement: project.language,
        }, {
          pattern: /@tx-theme/gi,
          replacement: project.theme,
        }, {
          pattern: /<style type="text\/css">(?:\r?\n|\r)/gi,
          replacement: '<style type="text/css">',
        }, {
          pattern: /(?:\r?\n|\r)<\/style>(?:\r?\n|\r)<script(?: id="loadcss")*>(?:\r?\n|\r)/gi,
          replacement: '</style>\n    <script type="text/javascript" id="loadcss">',
        }, {
          pattern: /(?:\r?\n|\r)<\/script>(?:\r?\n|\r)<noscript>(?:\r?\n|\r)/gi,
          replacement: '</script>\n    <noscript>',
        }, {
          pattern: /(?:\r?\n|\r)<\/noscript>/gi,
          replacement: '</noscript>',
        }],
      },
      files: {
        './': `${project.build.dir}*.{html,webapp,json}`,
      },
    },
  };
};
