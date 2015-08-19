'use strict';

import { default as isObject } from 'is-object';
import { compose, filter, fold, map, pluck } from './1-liners-curried';

const pkg = require('../package.json');

let camelize = str => str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c ? c.toUpperCase() : '');
let exportName = str => camelize(str.replace(/fd-/, ''));

let joinLines = fold((a, b) => `${a}\n${b}`, '"use strict";\n' );
let exportAll = pkg => `export { ${pkg[1]} } from  '${pkg[0]}';`;
let exportAs = pkg => `export { default as ${exportName(pkg[0])} } from '${pkg[0]}';`;

// create package exports lines
let isDefaultExport = pkg => pkg[1] === 'default';
let exportLine = pkg => isDefaultExport(pkg) ? exportAs(pkg) : exportAll(pkg);
let buildExport = compose(joinLines, map(exportLine));

// list dependencies
let sortList = list => list.sort();
let onlyFdPackage = pkg =>  !!pkg.match(/^fd-.+/);
let pkgNames = deps => Object.keys(deps);

let fpDomList = compose(sortList, filter(onlyFdPackage), pkgNames, pluck('dependencies'));

let filterFunctionNames = modObj => filter(name => !name.match(/^__/))(Object.keys(modObj));

let getModuleExports = map(mod => {
  let modObj = require(mod);
  return isObject(modObj) ? [mod, filterFunctionNames(modObj)] : [mod, 'default'];
});

// list & build
let app = compose(buildExport, getModuleExports, fpDomList);

console.log(app(pkg));
