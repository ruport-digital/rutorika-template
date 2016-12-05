/* global casper, phantomcss */

casper.start('build/index.html')
  .then(function() {
    phantomcss.screenshot('body');
  });
