'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isObject = require('is-object');

var _isObject2 = _interopRequireDefault(_isObject);

var _fjFilter = require('fj-filter');

var _fjFilter2 = _interopRequireDefault(_fjFilter);

var _fjCompose = require('fj-compose');

var _fjCompose2 = _interopRequireDefault(_fjCompose);

var _fjPluck = require('fj-pluck');

var _fjPluck2 = _interopRequireDefault(_fjPluck);

var _fjMap = require('fj-map');

var _fjMap2 = _interopRequireDefault(_fjMap);

var _fjSome = require('fj-some');

var _fjSome2 = _interopRequireDefault(_fjSome);

var _fjFold = require('fj-fold');

var _fjCurry = require('fj-curry');

var _fjApply = require('fj-apply');

var camelize = function camelize(str) {
  return str.trim().replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : '';
  });
};

var joinLines = (0, _fjFold.foldl)('"use strict";\n', function (a, b) {
  return a + '\n' + b;
});
var exportAll = function exportAll(pkg) {
  return 'export { ' + pkg[1] + ' } from  \'' + pkg[0] + '\';';
};
var exportAs = function exportAs(pkg) {
  return 'export { default as ' + camelize(pkg[0].replace(/fd-/, '')) + ' } from \'' + pkg[0] + '\';';
};

// create package exports lines
var isDefaultExport = function isDefaultExport(pkg) {
  return pkg[1] === 'default';
};
var exportLine = function exportLine(pkg) {
  return isDefaultExport(pkg) ? exportAs(pkg) : exportAll(pkg);
};
var buildExport = (0, _fjCompose2['default'])(joinLines, (0, _fjMap2['default'])(exportLine));

// list dependencies
var sortList = function sortList(list) {
  return list.sort();
};
var onlyFdPackage = function onlyFdPackage(pkg) {
  return !!pkg.match(/^fd-.+/);
};
var pkgNames = function pkgNames(deps) {
  return Object.keys(deps);
};

var fpDomList = (0, _fjCompose2['default'])(sortList, (0, _fjFilter2['default'])(onlyFdPackage), pkgNames, (0, _fjPluck2['default'])('dependencies'));

var getModuleExports = (0, _fjMap2['default'])(function (mod) {
  var modObj = require(mod);
  return (0, _isObject2['default'])(modObj) ? [mod, (0, _fjFilter2['default'])(function (name) {
    return !name.match(/^__/);
  }, Object.keys(modObj))] : [mod, 'default'];
});

// list & build
var app = (0, _fjCompose2['default'])(buildExport, getModuleExports, fpDomList);

var pkg = require('./package.json');
console.log(app(pkg));

