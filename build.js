"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var isObject = _interopRequire(require("is-object"));

var filter = _interopRequire(require("fj-filter"));

var compose = _interopRequire(require("fj-compose"));

var pluck = _interopRequire(require("fj-pluck"));

var map = _interopRequire(require("fj-map"));

var some = _interopRequire(require("fj-some"));

var foldl = require("fj-fold").foldl;

var curry = require("fj-curry").curry;

var apply = require("fj-apply").apply;

var camelize = function (str) {
  return str.trim().replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
};

var joinLines = foldl("\"use strict\";\n", function (a, b) {
  return "" + a + "\n" + b;
});
var exportAll = function (pkg) {
  return "export { " + pkg[1] + " } from  '" + pkg[0] + "';";
};
var exportAs = function (pkg) {
  return "export { default as " + camelize(pkg[0].replace(/fd-/, "")) + " } from '" + pkg[0] + "';";
};

// create package exports lines
var isDefaultExport = function (pkg) {
  return pkg[1] === "default";
};
var exportLine = function (pkg) {
  return isDefaultExport(pkg) ? exportAs(pkg) : exportAll(pkg);
};
var buildExport = compose(joinLines, map(exportLine));

// list dependencies
var sortList = function (list) {
  return list.sort();
};
var onlyFdPackage = function (pkg) {
  return !!pkg.match(/^fd-.+/);
};
var pkgNames = function (deps) {
  return Object.keys(deps);
};

var fpDomList = compose(sortList, filter(onlyFdPackage), pkgNames, pluck("dependencies"));

var getModuleExports = map(function (mod) {
  var modObj = require(mod);
  return isObject(modObj) ? [mod, filter(function (name) {
    return !name.match(/^__/);
  }, Object.keys(modObj))] : [mod, "default"];
});

// list & build
var app = compose(buildExport, getModuleExports, fpDomList);

var pkg = require("./package.json");
console.log(app(pkg));

