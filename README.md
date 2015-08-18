# FP-DOM

A container module to group lots of simple functional tools. This package only re-export all of the `fp-dom` tools found [here](https://github.com/fp-dom).


## Usage

All packages are re-exported without the `fd-` prefix. Some packages, `fd-select`, `fd-class` exports more than one function and are also available in the root level of `fp-dom`.

### Import all package at once

```javascript
import * as fpdom from 'fp-dom';

// use any module: 

let appendtoBody = fpdom.append(document.body),
  h1 = fpdom.elem('h1','meow'),
  h2 = fpdom.elem('h2', 'bow');

appendtoBody(h1);
fpdom.replace(document.body,h2,h1);


let foo = fpdom.select(document)('.foo');  // array of .foo elements
let bar = fpdom.selectOne(document)('.bar'); // first .bar element

```

### Import some packages

```javascript
import { animate, append, listen, select, velem } from 'fp-dom';

// use them directly

let onClick = listen('click');
let onClickSetClicked = onClick((event) => {
  event.target.innerHTML = 'clicked';
});

onClickSetClicked(select('.link'));
```

### Requires in ES5

You can still use ES5 modules to `require` some of all modules.

```
var fpdom = require('fp-dom');

var selectOne = require('fp-dom').selectOne;
var replace = require('fp-dom').replace;

```


## Included modules

* [fd-animate](https://github.com/fp-dom/fd-animate)
* [fd-append](https://github.com/fp-dom/fd-append)
* [fd-class](https://github.com/fp-dom/fd-class) exports: `addClass / removeClass / toggleClass / hasClass`
* [fd-contains](https://github.com/fp-dom/fd-contains)
* [fd-elem](https://github.com/fp-dom/fd-elem)
* [fd-insert-after](https://github.com/fp-dom/fd-insert-after)
* [fd-insert-before](https://github.com/fp-dom/fd-insert-before)
* [fd-interval](https://github.com/fp-dom/fd-interval)
* [fd-isdom](https://github.com/fp-dom/fd-isdom)
* [fd-isVdom](https://github.com/fp-dom/fd-isVdom)
* [fd-listen](https://github.com/fp-dom/fd-listen)
* [fd-prepend](https://github.com/fp-dom/fd-prepend)
* [fd-replace](https://github.com/fp-dom/fd-replace)
* [fd-select](https://github.com/fp-dom/fd-select)  exports: `select / selectOne`
* [fd-setattr](https://github.com/fp-dom/fd-setattr)
* [fd-timeout](https://github.com/fp-dom/fd-timeout)
* [fd-velem](https://github.com/fp-dom/fd-velem)

