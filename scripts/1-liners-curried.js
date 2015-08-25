import { composeAll, curry, property as property1, filter as filter1, map as map1, fold as fold1 } from '1-liners';

let filter = curry(filter1);
let map = curry(map1);
let fold = curry(fold1);
let property = curry(property1);

export {
  curry, composeAll, filter, fold, map, property
};
