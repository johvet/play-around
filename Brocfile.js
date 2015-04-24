/* Brocfile.js */

// Import some Broccoli plugins
var compileSass = require('broccoli-sass');
var filterCoffeeScript = require('broccoli-coffee');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var pickFiles = require('broccoli-static-compiler');
var compileES6 = require('broccoli-es6-concatenator')
// Specify the Sass and Coffeescript directories
var sassDir = 'app/sass';
var coffeeDir = 'app/coffeescript';

// Tell Broccoli how we want the assets to be compiled
var styles = compileSass([sassDir], 'app.sass', 'css/art19-web-player.css');
var scripts = filterCoffeeScript(coffeeDir);

var vendor = pickFiles('vendor', { srcDir: '/', destDir: 'vendor' });
var app = pickFiles('app', { srcDir: '/', destDir: 'appkit' });

var bowerTrees = findBowerTrees();
var sourceTree = mergeTrees(bowerTrees.concat([scripts, vendor]));

var appJs = compileES6(sourceTree, {
  loaderFile: 'vendor/js/loader.js',
  ignoredModules: [
  ],
  inputFiles: [
  '**/*.js',
  ],
  legacyFilesToAppend: [
    // 'jquery.js',
    // 'handlebars.js',
    // 'ember.js',
  ],
  wrapInEval: true,
  outputFile: '/assets/art19-web-player.js'
});

var publicFiles = 'public'

// Merge the compiled styles and scripts into one output directory.
module.exports = mergeTrees([styles, publicFiles, appJs]);
