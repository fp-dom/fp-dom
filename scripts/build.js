'use strict';

import { writeFileSync } from 'fs';
import * as path from 'path';
import { default as isObject } from 'is-object';
import { curry, composeAll, filter, fold, map, property } from './1-liners-curried';

const pkg = require('../package.json');

let camelize = str => str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c ? c.toUpperCase() : '');
let dasherize = str => str.trim().replace(/[A-Z]/g, (match, c) => (c !== 0 ? '-' : '') + match.toLowerCase() );
let exportName = str => camelize(str.replace(/fd-/, ''));

let joinLines = fold((a, b) => `${a}\n${b}`, '"use strict";\n' );
let exportAll = pkg => `export { ${pkg[1]} } from  '${pkg[0]}';`;
let exportAs = pkg => `export { default as ${exportName(pkg[0])} } from '${pkg[0]}';`;
let exportModuleAs = pkg => `export { ${exportName(pkg[1])} as default } from '${pkg[0]}';`;

// create package exports lines
let isDefaultExport = pkg => pkg[1] === 'default';
let exportIndexLine = pkg => isDefaultExport(pkg) ? exportAs(pkg) : exportAll(pkg);
let exportModuleLine = pkg => !isDefaultExport(pkg) ? exportModuleAs(pkg) : exportAll(pkg);
let buildExport = composeAll([joinLines, map(exportIndexLine)]);

// list dependencies
let sortList = list => list.sort();
let onlyFdPackage = pkg => !!pkg.match(/^fd-.+/);
let pkgNames = deps => Object.keys(deps);

let fpDomList = composeAll([sortList, filter(onlyFdPackage), pkgNames, property('dependencies')]);

let filterFunctionNames = modObj => filter(name => !name.match(/^__/))(Object.keys(modObj));

let getModuleExports = map(mod => {
  let modObj = require(mod);
  return isObject(modObj) ? [mod, filterFunctionNames(modObj)] : [mod, 'default'];
});

let writeSingleModuleFile = (pkg, moduleName, file) => {
    let fileName = path.join('module', dasherize(file === 'default' ? moduleName : file ) + '.js' );
    writeFileSync(fileName, exportModuleLine([pkg[0], file]));
};

let writeExportFiles = pkg => {
  let files = Array.isArray(pkg[1])?pkg[1]:[pkg[1]];
  let moduleName = exportName(pkg[0]);
  files.map(file => {
      let fileName = path.join('module', dasherize(file === 'default' ? moduleName : file ) + '.js' );
      writeFileSync(fileName, exportModuleLine([pkg[0], file]));
  });
  return pkg;
};

let writeIndex = lines => writeFileSync(path.join('module', 'index.js'), lines);

let buildStandaloneFiles = map(writeExportFiles);

// list & build
let runIndexer = composeAll([writeIndex, buildExport, buildStandaloneFiles, getModuleExports, fpDomList]);

runIndexer(pkg);

