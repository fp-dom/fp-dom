'use strict';

import { default as isObject } from 'is-object';

import { default as filter } from 'fj-filter';
import { default as compose } from 'fj-compose';
import { default as pluck } from 'fj-pluck';
import { default as map } from 'fj-map';
import { default as some } from 'fj-some';
import { foldl } from 'fj-fold';
import { curry } from 'fj-curry';
import { apply } from 'fj-apply';

let camelize = str => str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c ? c.toUpperCase() : '');

let joinLines = foldl('"use strict";\n', (a, b) => `${a}\n${b}`);
let exportAll = pkg => `export { ${pkg[1]} } from  '${pkg[0]}';`;
let exportAs = pkg => `export { default as ${camelize(pkg[0].replace(/fd-/, ''))} } from '${pkg[0]}';`;

// create package exports lines
let isDefaultExport = pkg => pkg[1] === 'default';
let exportLine = pkg => isDefaultExport(pkg) ? exportAs(pkg) : exportAll(pkg);
let buildExport = compose(joinLines, map(exportLine));

// list dependencies
let sortList = list => list.sort();
let onlyFdPackage = pkg =>  !!pkg.match(/^fd-.+/);
let pkgNames = deps => Object.keys(deps);

let fpDomList = compose(sortList, filter(onlyFdPackage), pkgNames, pluck('dependencies'));

let getModuleExports = map(mod => {
  let modObj = require(mod);
  return isObject(modObj) ? [mod, filter(name => !name.match(/^__/), Object.keys(modObj))] : [mod, 'default'];
});

// list & build
let app = compose(buildExport, getModuleExports, fpDomList);

const pkg = require('../package.json');
console.log(app(pkg));


