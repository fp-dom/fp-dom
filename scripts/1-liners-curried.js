import { curry, pick, filter as filter1, map as map1, fold as fold1 } from '1-liners';

// 1-liners/compose only works with 2 functions, fj-compose accepts multiple fns
import { default as compose } from 'fj-compose';

let filter = curry(filter1);
let map = curry(map1);
let pluck = curry((prop, x) => pick([prop], x)[prop] );
let fold = curry(fold1);

export {
  compose, filter, fold, map, pluck
};
